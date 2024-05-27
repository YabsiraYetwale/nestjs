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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
const create_company_dto_1 = require("../companies/dto/create-company.dto");
let AuthService = class AuthService {
    constructor(jwtService, prismaService) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async registerUser(registerUserDto) {
        const { email, username, password } = registerUserDto, post = __rest(registerUserDto, ["email", "username", "password"]);
        const existingUserEmail = await this.prismaService.User.findUnique({
            where: { email: email },
        });
        const existingUserUsername = await this.prismaService.User.findUnique({
            where: { username: username },
        });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (existingUserEmail) {
            throw new common_1.HttpException('Email already exists', 409);
        }
        else if (existingUserUsername) {
            throw new common_1.HttpException('Username already exists', 409);
        }
        else {
            const user = await this.prismaService.User.create({
                data: Object.assign({ username, password: hashedPassword, email }, post),
            });
            return { message: 'User registered successfully' };
        }
    }
    async registerUserCompany(registerCompanyDto, request) {
        const { users, documents, name, company_number, vat_reg_number, tel1, tel2, house_no, po_box, fax, email } = registerCompanyDto, post = __rest(registerCompanyDto, ["users", "documents", "name", "company_number", "vat_reg_number", "tel1", "tel2", "house_no", "po_box", "fax", "email"]);
        const existingUserEmail = await this.prismaService.User.findUnique({
            where: { email: users.email },
        });
        const existingUserUsername = await this.prismaService.User.findUnique({
            where: { username: users.username },
        });
        const existingCompanyName = await this.prismaService.Company.findUnique({
            where: { name },
        });
        const existingCompanyNumber = await this.prismaService.Company.findUnique({
            where: { company_number },
        });
        const existingCompanyVatRegNo = await this.prismaService.Company.findUnique({ where: { vat_reg_number } });
        const existingCompanyTel1 = await this.prismaService.Company.findUnique({
            where: { tel1 },
        });
        const existingCompanyTel2 = await this.prismaService.Company.findUnique({
            where: { tel2 },
        });
        const existingHouseNumber = await this.prismaService.Company.findUnique({
            where: { house_no },
        });
        const existingPo_box = await this.prismaService.Company.findUnique({
            where: { po_box },
        });
        const existingFax = await this.prismaService.Company.findUnique({
            where: { fax },
        });
        const existingCompanyEmail = await this.prismaService.Company.findUnique({
            where: { email },
        });
        const hashedPassword = await bcrypt.hash(users.password, 10);
        if (existingUserEmail) {
            throw new common_1.HttpException('Email already exists', 409);
        }
        else if (existingUserUsername) {
            throw new common_1.HttpException('Username already exists', 409);
        }
        else if (existingCompanyName) {
            throw new common_1.HttpException('CompanyName already exists', 409);
        }
        else if (existingCompanyNumber) {
            throw new common_1.HttpException('CompanyNumber already exists', 409);
        }
        else if (existingCompanyVatRegNo) {
            throw new common_1.HttpException('CompanyVatRegNo already exists', 409);
        }
        else if (existingCompanyTel1) {
            throw new common_1.HttpException('CompanyTel1 already exists', 409);
        }
        else if (existingCompanyTel2) {
            throw new common_1.HttpException('CompanyTel2 already exists', 409);
        }
        else if (existingHouseNumber) {
            throw new common_1.HttpException('HouseNumber already exists', 409);
        }
        else if (existingPo_box) {
            throw new common_1.HttpException('Po_box already exists', 409);
        }
        else if (existingFax) {
            throw new common_1.HttpException('Fax already exists', 409);
        }
        else if (existingCompanyEmail) {
            throw new common_1.HttpException('CompanyEmail already exists', 409);
        }
        else {
            const protocol = 'https';
            const host = request.get('host');
            const user = await this.prismaService.Company.create({
                data: Object.assign({ users: {
                        create: {
                            username: users.username,
                            password: hashedPassword,
                            email: users.email,
                            role: users.role,
                        },
                    }, name,
                    company_number,
                    vat_reg_number,
                    tel1,
                    tel2,
                    house_no,
                    po_box,
                    fax,
                    email }, post),
            });
            return { message: 'User/Company registered successfully' };
        }
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        const existingUser = await this.prismaService.User.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new common_1.HttpException({ message: "User doesn't exist." }, 404);
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
        if (!isPasswordMatch) {
            throw new common_1.HttpException('invalid credentials', 401);
        }
        else if (isPasswordMatch) {
            const { password } = existingUser, user = __rest(existingUser, ["password"]);
            const token = this.jwtService.sign(Object.assign({}, user));
            return { token };
        }
    }
    async getCurrentUser(userId) {
        const user = await this.prismaService.User.findUnique({
            where: { id: userId },
            include: { company: true },
        });
        if (!user) {
            throw new common_1.HttpException("User doesn't exist", 404);
        }
        return user;
    }
    async getAllUsers() {
        const allUsers = await this.prismaService.User.findMany();
        return { allUsers };
    }
    async getOneUser(id) {
        const user = await this.prismaService.User.findUnique({ where: id });
        if (!user) {
            throw new common_1.HttpException("User doesn't exist", 404);
        }
        else {
            return { user };
        }
    }
    async updateUser(id, updateUserDto) {
        const post = updateUserDto;
        const existingUser = await this.prismaService.User.findUnique({
            where: id,
        });
        if (!existingUser) {
            throw new common_1.HttpException("User doesn't exist", 404);
        }
        const updatedUser = await this.prismaService.User.update({
            where: id,
            data: Object.assign({}, post),
        });
        if (!updatedUser) {
            throw new Error('Failed to update User');
        }
        const { password } = updateUserDto, user = __rest(updateUserDto, ["password"]);
        const token = this.jwtService.sign(Object.assign({}, user));
        return { token, message: 'User updated successfully!' };
    }
    async deleteUser(id) {
        const existingUser = await this.prismaService.User.findUnique({
            where: id,
        });
        if (!existingUser) {
            throw new common_1.HttpException("User doesn't exist", 404);
        }
        const deletedUser = await this.prismaService.User.delete({ where: id });
        if (!deletedUser) {
            throw new Error('Failed to delete user');
        }
        else {
            return { message: 'User deleted successfully' };
        }
    }
};
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "registerUserCompany", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map