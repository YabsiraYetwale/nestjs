/// <reference types="multer" />
/// <reference types="passport" />
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginUserDto } from './dto/login.dto';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(createCompanyDto: CreateCompanyDto, files: {
        file_name?: Express.Multer.File[];
        company_logo?: Express.Multer.File[];
    }, request: Request): Promise<{
        message: string;
    }>;
    loginUser(req: Request, loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    getCurrentUser(req: Request): Express.User;
    getAllUsers(): Promise<{
        allUsers: any;
    }>;
    getOneUser(id: string): Promise<{
        user: any;
    }>;
    updateUser(id: string, updateUserDto: RegisterUserDto): Promise<{
        token: string;
        message: string;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
