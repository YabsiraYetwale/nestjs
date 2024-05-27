import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
export declare class AuthService {
    private jwtService;
    private prismaService;
    constructor(jwtService: JwtService, prismaService: PrismaService);
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
    registerUserCompany(registerCompanyDto: CreateCompanyDto, request: Request): Promise<{
        message: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    getCurrentUser(userId: string): Promise<any>;
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
