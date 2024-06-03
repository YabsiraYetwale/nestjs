/// <reference types="multer" />
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Request } from 'express';
export declare class CompaniesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllCompanies(): Promise<{
        allCompanies: any;
    }>;
    getOneCompany(id: string): Promise<{
        company: any;
    }>;
    updateCompany(id: string, updateCompanyDto: UpdateCompanyDto, file_name: Express.Multer.File[], company_logo: Express.Multer.File[], request: Request): Promise<any>;
    deleteCompany(id: string): Promise<{
        message: string;
    }>;
}
