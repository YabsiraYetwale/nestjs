import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ActivationAccountDto } from './dto/activation.account.dto';
import { SigninAuthDto } from './dto/signin.user.dto';
import { ResetPassword } from './dto/reset.password.dto';
import { ForgotPassword } from './dto/forgot.password.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { RegistrationUserDto } from './dto/registration.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private configService;
    private mailerService;
    [x: string]: any;
    constructor(prisma: PrismaService, jwt: JwtService, configService: ConfigService, mailerService: MailerService);
    createActivationToken(email: string): Promise<{
        token: string;
        activationCode: string;
    }>;
    forgotPassword(dto: ForgotPassword): Promise<{
        success: boolean;
        message: string;
        token: string;
    }>;
    activationAccount(dto: ActivationAccountDto, res: any): Promise<any>;
    signin(dto: SigninAuthDto, res: any): Promise<any>;
    logout(request: any, response: any): Promise<void>;
    resetPassword(dto: ResetPassword): Promise<{
        success: boolean;
        message: string;
    }>;
    refreshToken(userId: string, res: any): Promise<void>;
    GetToken(userId: string, email: string, roles: any[], permissions: any[]): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    createUser(dto: RegistrationUserDto): Promise<any>;
}
