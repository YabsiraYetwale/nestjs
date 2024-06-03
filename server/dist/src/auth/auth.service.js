"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const resetPassword_template_1 = require("../mail_templates/resetPassword.template");
const account_verification_1 = require("../utils/account.verification");
const mailer_service_1 = require("../mailer/mailer.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, configService, mailerService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.configService = configService;
        this.mailerService = mailerService;
    }
    async createActivationToken(email) {
        const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const token = await this.jwt.signAsync({ email, activationCode }, {
            secret: this.configService.get('ACTIVATION_SECRET'),
            expiresIn: '1h',
        });
        return { token, activationCode };
    }
    async forgotPassword(dto) {
        const transporter = this.mailerService.mailTransport();
        try {
            const email = dto.email;
            const token = await this.jwt.signAsync({ email }, {
                secret: this.configService.get('FORGOT_PASSWORD'),
                expiresIn: '1h',
            });
            const html = (0, resetPassword_template_1.resetPasswordTemplate)(`http://localhost:3001/amh/resetPassword?token=${token}`);
            const mailerOptions = {
                from: {
                    name: 'Yabsira Yetwale',
                    address: this.configService.get('SMTP_MAIL'),
                },
                to: dto.email,
                subject: 'Verify Your Email',
                html: html,
            };
            await transporter.sendMail(mailerOptions);
            return {
                success: true,
                message: 'success send to email; and  please reset your password',
                token: token,
            };
        }
        catch (err) {
            throw err;
        }
    }
    async activationAccount(dto, res) {
        try {
            const newUser = await this.jwt.verify(dto.activation_token, {
                secret: this.configService.get('ACTIVATION_SECRET'),
            });
            if (!newUser) {
                throw new common_1.ForbiddenException('token is expired');
            }
            if (newUser.activationCode !== dto.activation_code) {
                throw new common_1.ForbiddenException('Invalid activation code');
            }
            const user = await this.prisma.User.findUnique({
                where: { email: newUser.email },
                include: {
                    roles: {
                        include: {
                            role: {
                                include: {
                                    permissions: {
                                        select: {
                                            action: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    permissions: {
                        select: {
                            role: {
                                select: {
                                    action: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('email not found');
            }
            await this.prisma.User.update({
                where: { email: newUser.email },
                data: {
                    emailVerified: new Date(),
                },
            });
            user.roles.forEach((role) => {
                role.role.permissions.forEach((permission) => {
                    if (!user.permissions.some((existingPermission) => existingPermission.role.action === permission.action)) {
                        user.permissions.push({ role: permission });
                    }
                });
            });
            const tokens = await this.GetToken(user.id, user.email, user.roles, user.permissions);
            await this.prisma.refreshToken.create({
                data: {
                    token: tokens.refresh_token,
                    userId: user.id,
                },
            });
            res.cookie('refreshToken', tokens.refresh_token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });
            res.send({
                message: 'Account verfied successfully!',
                accessToken: tokens.access_token,
            });
        }
        catch (err) {
            throw new common_1.ForbiddenException({ success: false, message: err.message });
        }
    }
    async signin(dto, res) {
        try {
            const user = await this.prisma.User.findUnique({
                where: {
                    email: dto.email,
                },
                include: {
                    roles: {
                        include: {
                            role: {
                                include: {
                                    permissions: {
                                        select: {
                                            action: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    permissions: {
                        select: {
                            role: {
                                select: {
                                    action: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!user)
                throw new common_1.ForbiddenException('Credentials are not valid');
            if (!user.emailVerified) {
                const activationToken = await this.createActivationToken(dto.email);
                const transporter = this.mailerService.mailTransport();
                await transporter.sendMail((0, account_verification_1.mailerOption)(dto.email, activationToken.activationCode, activationToken.token));
                res.send({
                    success: true,
                    message: `Account not verified! Please check your email ${dto.email} to verify.`,
                    activationToken: activationToken.token,
                });
            }
            const isMatch = await bcrypt.compare(dto.password, user.password);
            if (!isMatch)
                throw new common_1.ForbiddenException('Credentials are not valid');
            user.roles.forEach((role) => {
                role.role.permissions.forEach((permission) => {
                    if (!user.permissions.some((existingPermission) => existingPermission.role.action === permission.action)) {
                        user.permissions.push({ role: permission });
                    }
                });
            });
            const tokens = await this.GetToken(user.id, user.email, user.roles, user.permissions);
            await this.prisma.refreshToken.create({
                data: {
                    token: tokens.refresh_token,
                    userId: user.id,
                },
            });
            res.cookie('refreshToken', tokens.refresh_token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });
            const { emailVerified, password, image, createdAt, updatedAt, company_id } = user, otherFields = __rest(user, ["emailVerified", "password", "image", "createdAt", "updatedAt", "company_id"]);
            res.send({
                message: 'Sign in successful',
                accessToken: this.jwt.sign(Object.assign({}, otherFields)),
            });
        }
        catch (err) {
            throw new common_1.ForbiddenException('Invalid Credentials');
        }
    }
    async logout(request, response) {
        const refreshToken = request.cookies['refreshToken'];
        const refreshTokenInDb = await this.prisma.refreshToken.findFirst({
            where: {
                token: refreshToken,
            },
        });
        if (refreshTokenInDb) {
            await this.prisma.refreshToken.delete({
                where: {
                    id: refreshTokenInDb.id,
                },
            });
        }
        response.clearCookie('refreshToken');
        response.send({ message: 'You have been logged out successfully' });
    }
    async resetPassword(dto) {
        try {
            if (dto.password !== dto.confirmPassword) {
                throw new common_1.ForbiddenException('password is not match');
            }
            const email = await this.jwt.verify(dto.token, {
                secret: this.configService.get('FORGOT_PASSWORD'),
            });
            if (!email.email) {
                throw new common_1.ForbiddenException('token is not valid');
            }
            const user = await this.prisma.User.findUnique({
                where: { email: email.email },
            });
            if (!user) {
                throw new common_1.ForbiddenException('email is not exist');
            }
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            await this.prisma.User.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                },
            });
            return {
                success: true,
                message: 'Your password updated successfully',
            };
        }
        catch (err) {
            throw err;
        }
    }
    async refreshToken(userId, res) {
        const user = await this.prisma.User.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    select: {
                                        action: true,
                                    },
                                },
                            },
                        },
                    },
                },
                permissions: {
                    select: {
                        role: {
                            select: {
                                action: true,
                            },
                        },
                    },
                },
            },
        });
        user.roles.forEach((role) => {
            role.role.permissions.forEach((permission) => {
                if (!user.permissions.some((existingPermission) => existingPermission.role.action === permission.action)) {
                    user.permissions.push({ role: permission });
                }
            });
        });
        const tokens = await this.GetToken(user.id, user.email, user.roles, user.permissions);
        await this.prisma.refreshToken.create({
            data: {
                token: tokens.refresh_token,
                userId: user.id,
            },
        });
        res.cookie('refreshToken', tokens.refresh_token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        res.send({
            message: 'token refresh successful',
            accessToken: tokens.access_token,
        });
    }
    async GetToken(userId, email, roles, permissions) {
        const jwtPayload = {
            id: userId,
            email: email,
            roles: roles,
            permissions: permissions,
        };
        const [at, rt] = await Promise.all([
            this.jwt.signAsync(jwtPayload, {
                secret: this.configService.get('AT_SECRET'),
                expiresIn: '1h',
            }),
            this.jwt.signAsync(jwtPayload, {
                secret: this.configService.get('RT_SECRET'),
                expiresIn: '1d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async createUser(dto) {
        try {
            const existingUser = await this.prisma.User.findFirst({
                where: { email: dto.email },
            });
            if (existingUser && existingUser.emailVerified) {
                throw new common_1.ForbiddenException('Email is already taken');
            }
            if (dto.password !== dto.retypePassword) {
                throw new common_1.ForbiddenException('password not match');
            }
            const transporter = this.mailerService.mailTransport();
            const activationToken = await this.createActivationToken(dto.email);
            if (existingUser && !existingUser.emailVerified) {
                await transporter.sendMail((0, account_verification_1.mailerOption)(dto.email, activationToken.activationCode, activationToken.token));
                return {
                    success: true,
                    message: `Account not Verify! Please check your email ${dto.email} to verify and ${activationToken.activationCode}`,
                    activationToken: activationToken.token,
                };
            }
            else {
                const hashedPassword = await bcrypt.hash(dto.password, 10);
                await this.prisma.User.create({
                    data: {
                        name: dto.name,
                        email: dto.email,
                        password: hashedPassword,
                    },
                });
                await transporter.sendMail((0, account_verification_1.mailerOption)(dto.email, activationToken.activationCode, activationToken.token));
                return {
                    success: true,
                    message: `Acount Create Success! Please check your email  to verify`,
                    activationToken: activationToken.token,
                };
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map