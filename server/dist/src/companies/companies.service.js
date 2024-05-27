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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const update_company_dto_1 = require("./dto/update-company.dto");
let CompaniesService = class CompaniesService {
    constructor(jwtService, prismaService) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async getAllCompanies() {
        const companies = await this.prismaService.Company.findMany({ include: { users: true, documents: true, additional_fields: true } });
        return { companies };
    }
    async getOneCompany(id) {
        const company = await this.prismaService.Company.findUnique({ where: id, include: { users: true, documents: true, additional_fields: true } });
        if (!company) {
            throw new common_1.HttpException("Company doesn't exist", 404);
        }
        else {
            return { company };
        }
    }
    async updateCompany(id, updateCompanyDto, file_name, company_logo, request) {
        const protocol = 'https';
        const host = request.get('host');
        const company_logo_url = company_logo ? `${protocol}://${host}/${company_logo[0].filename}` : null;
        const { additional_fields, users, documents } = updateCompanyDto, post = __rest(updateCompanyDto, ["additional_fields", "users", "documents"]);
        const existingCompany = await this.prismaService.Company.findUnique({ where: id,
            include: { documents: true, additional_fields: true },
        });
        if (!existingCompany) {
            throw new common_1.HttpException("Company doesn't exist", 404);
        }
        await this.prismaService.Document.deleteMany({
            where: { company_id: existingCompany.id },
        });
        const newDocuments = {
            create: file_name
                ? file_name.map((file) => ({
                    file_name: file.originalname,
                    file_path: `${protocol}://${host}/${file.filename}`,
                }))
                : [],
        };
        const updatedCompany = await this.prismaService.Company.update({
            where: id,
            data: Object.assign(Object.assign({ additional_fields: {
                    create: additional_fields,
                }, company_logo: company_logo_url }, post), { documents: newDocuments }),
        });
        if (!updatedCompany) {
            throw new Error("Failed to update Company");
        }
        return Object.assign(Object.assign({}, updatedCompany), { message: "Company updated successfully!" });
    }
    async deleteCompany(id) {
        const existingCompany = await this.prismaService.Company.findUnique({ where: id });
        if (!existingCompany) {
            throw new common_1.HttpException("Company doesn't exist", 404);
        }
        const deletedCompany = await this.prismaService.Company.delete({ where: id });
        if (!deletedCompany) {
            throw new Error("Failed to delete company");
        }
        else {
            return { message: "Company deleted successfully" };
        }
    }
};
__decorate([
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_dto_1.UpdateCompanyDto, Array, Array, Object]),
    __metadata("design:returntype", Promise)
], CompaniesService.prototype, "updateCompany", null);
CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], CompaniesService);
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.service.js.map