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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesStatusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let InvoicesStatusService = class InvoicesStatusService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async MarkInvoicepaid(id) {
        const existingInvoiceStatus = await this.prismaService.Invoices.findUnique({ where: id });
        if (!existingInvoiceStatus) {
            throw new common_1.HttpException("InvoiceStatus doesn't exist", 404);
        }
        const updatedInvoiceStatus = await this.prismaService.Invoices.update({ where: id, data: { status: "paid" } });
        if (!updatedInvoiceStatus) {
            throw new Error("Failed to update InvoiceStatus");
        }
        return Object.assign({}, updatedInvoiceStatus);
    }
    async MarkInvoiceunpaid(id) {
        const existingInvoiceStatus = await this.prismaService.Invoices.findUnique({ where: id });
        if (!existingInvoiceStatus) {
            throw new common_1.HttpException("InvoiceStatus doesn't exist", 404);
        }
        const updatedInvoiceStatus = await this.prismaService.Invoices.update({ where: id, data: { status: "unpaid" } });
        if (!updatedInvoiceStatus) {
            throw new Error("Failed to update InvoiceStatus");
        }
        return Object.assign({}, updatedInvoiceStatus);
    }
    async MarkInvoiceRead(id) {
        const existingInvoiceStatus = await this.prismaService.Invoices.findUnique({ where: id });
        if (!existingInvoiceStatus) {
            throw new common_1.HttpException("InvoiceStatus doesn't exist", 404);
        }
        const updatedInvoiceStatus = await this.prismaService.Invoices.update({ where: id, data: { status: "read" } });
        if (!updatedInvoiceStatus) {
            throw new Error("Failed to update InvoiceStatus");
        }
        return Object.assign({}, updatedInvoiceStatus);
    }
};
InvoicesStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesStatusService);
exports.InvoicesStatusService = InvoicesStatusService;
//# sourceMappingURL=invoices-Status.service.js.map