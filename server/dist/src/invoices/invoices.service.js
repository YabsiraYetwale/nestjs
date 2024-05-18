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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const clients_service_1 = require("../clients/clients.service");
let InvoicesService = class InvoicesService {
    constructor(prismaService, clientsService) {
        this.prismaService = prismaService;
        this.clientsService = clientsService;
    }
    async getAllInvoices(searchQuery, query) {
        let whereCondition = {};
        if (searchQuery) {
            const lowercaseQuery = searchQuery.toLowerCase();
            whereCondition = {
                OR: [
                    {
                        due_date: {
                            contains: lowercaseQuery,
                        },
                    },
                    {
                        status: {
                            contains: lowercaseQuery,
                        },
                    },
                    {
                        invoice_number: {
                            contains: lowercaseQuery,
                        },
                    },
                    {
                        client_id: {
                            contains: lowercaseQuery,
                        },
                    },
                ],
            };
        }
        const invoices = await this.prismaService.invoices.findMany({
            where: whereCondition,
            include: { line_items: true, client: true, creator: true, },
        });
        if (!searchQuery) {
            return invoices;
        }
        return invoices.length > 0 ? invoices : 'No matching invoices found.';
    }
    async getOneInvoice(id) {
        const invoice = await this.prismaService.Invoices.findUnique({
            where: id,
            include: { line_items: true, client: true, creator: true, company: true, },
        });
        if (!invoice) {
            throw new common_1.HttpException("Invoice doesn't exist", 404);
        }
        else {
            return { invoice };
        }
    }
    async createInvoice(createInvoiceDto, validatedUser) {
        const { total_amount, line_items, client, creator, company } = createInvoiceDto, post = __rest(createInvoiceDto, ["total_amount", "line_items", "client", "creator", "company"]);
        const totalAmount = line_items === null || line_items === void 0 ? void 0 : line_items.reduce((total, item) => {
            return total + item.quantity * item.unit_price;
        }, 0);
        const lastInvoice = await this.prismaService.Invoices.findFirst({
            orderBy: { invoice_number: 'desc' },
        });
        let invoiceNumber = 'INV-001';
        if (lastInvoice && lastInvoice.invoice_number) {
            const lastNumber = parseInt(lastInvoice.invoice_number.split('-')[1]);
            invoiceNumber = `INV-${(lastNumber + 1).toString().padStart(3, '0')}`;
        }
        const newInvoice = await this.prismaService.Invoices.create({
            data: Object.assign(Object.assign({ invoice_number: invoiceNumber, total_amount: totalAmount, client: {
                    create: {
                        name: client.name,
                        billing_address: client.billing_address,
                        shipping_address: client.shipping_address,
                        shipping_city: client.shipping_city,
                        shipping_state: client.shipping_state,
                        shipping_zip: client.shipping_zip,
                        shipping_country: client.shipping_country,
                        contact_person: client.contact_person,
                        email: client.email,
                        phone: client.phone,
                    },
                }, creator: {
                    connect: {
                        id: validatedUser.id,
                    },
                }, company: {
                    connect: {
                        id: validatedUser.company_id,
                    },
                } }, post), { line_items: {
                    create: line_items === null || line_items === void 0 ? void 0 : line_items.map((item) => ({
                        description: item.description,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        tax_rate: item.tax_rate,
                    })),
                } }),
            include: {
                line_items: true,
                client: true,
                creator: true,
                company: true,
            },
        });
        return newInvoice;
    }
    async updateInvoice(id, updateInvoiceDto) {
        const { total_amount, client, line_items } = updateInvoiceDto, post = __rest(updateInvoiceDto, ["total_amount", "client", "line_items"]);
        const existingInvoice = await this.prismaService.Invoices.findUnique({
            where: id,
            include: { line_items: true },
        });
        if (!existingInvoice) {
            throw new common_1.HttpException("Invoice doesn't exist", 404);
        }
        await this.prismaService.Line_Items.deleteMany({
            where: { invoice_id: existingInvoice.id },
        });
        const totalAmount = line_items === null || line_items === void 0 ? void 0 : line_items.reduce((total, item) => {
            return total + item.quantity * item.unit_price;
        }, 0);
        const updatedInvoice = await this.prismaService.Invoices.update({
            where: id,
            data: Object.assign(Object.assign({ total_amount: totalAmount }, post), { client: {
                    update: {
                        name: client.name,
                        billing_address: client.billing_address,
                        shipping_address: client.shipping_address,
                        shipping_city: client.shipping_city,
                        shipping_state: client.shipping_state,
                        shipping_zip: client.shipping_zip,
                        shipping_country: client.shipping_country,
                        contact_person: client.contact_person,
                        email: client.email,
                        phone: client.phone,
                    }
                }, line_items: {
                    create: line_items === null || line_items === void 0 ? void 0 : line_items.map((item) => ({
                        description: item.description,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        tax_rate: item.tax_rate,
                    })),
                } }),
        });
        if (!updatedInvoice) {
            throw new Error('Failed to update Invoice!!!');
        }
        return Object.assign({}, updatedInvoice);
    }
    async deleteInvoice(id) {
        const existingInvoice = await this.prismaService.Invoices.findUnique({
            where: id,
        });
        if (!existingInvoice) {
            throw new common_1.HttpException("Invoice doesn't exist", 404);
        }
        const deletedInvoice = await this.prismaService.Invoices.delete({
            where: id,
        });
        if (!deletedInvoice) {
            throw new Error('Failed to delete Invoice');
        }
        else {
            return { message: 'Invoice deleted successfully' };
        }
    }
};
InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, clients_service_1.ClientsService])
], InvoicesService);
exports.InvoicesService = InvoicesService;
//# sourceMappingURL=invoices.service.js.map