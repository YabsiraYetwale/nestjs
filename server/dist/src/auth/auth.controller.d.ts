/// <reference types="passport" />
import { AuthService } from './auth.service';
import { ActivationAccountDto } from './dto/activation.account.dto';
import { SigninAuthDto } from './dto/signin.user.dto';
import { Response } from 'express';
import { ForgotPassword } from './dto/forgot.password.dto';
import { ResetPassword } from './dto/reset.password.dto';
import { RegistrationUserDto } from './dto/registration.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getCurrentUser(req: Request): Express.User;
    createUser(dto: RegistrationUserDto): Promise<any>;
    activateUser(dto: ActivationAccountDto, res: Response): Promise<void>;
    signIn(credentials: SigninAuthDto, res: Response): Promise<any>;
    forgotPassword(dto: ForgotPassword): Promise<{
        success: boolean;
        message: string;
        token: string;
    }>;
    resetPassword(dto: ResetPassword): Promise<{
        success: boolean;
        message: string;
    }>;
    logout(request: Request, response: Response): Promise<void>;
}
