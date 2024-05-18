/// <reference types="multer" />
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Request } from 'express';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    getAllCompanies(): Promise<{
        allCompanies: any;
    }>;
    getOneCompany(id: string): Promise<{
        company: any;
    }>;
    updateUser(id: string, updateCompanyDto: UpdateCompanyDto, files: {
        file_name?: Express.Multer.File[];
        company_logo?: Express.Multer.File[];
    }, request: Request): Promise<any>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
