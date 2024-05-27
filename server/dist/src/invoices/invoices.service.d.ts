import { Query } from 'express-serve-static-core';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsService } from 'src/clients/clients.service';
import { CreateInvoiceDto } from './dto/create-Invoice.dto';
import { UpdateInvoiceDto } from './dto/update-Invoice.dto';
import { User, Company } from '@prisma/client';
interface ValidatedUser extends User {
    company: Company;
}
export declare class InvoicesService {
    private prismaService;
    private clientsService;
    constructor(prismaService: PrismaService, clientsService: ClientsService);
    getAllInvoices(searchQuery: string, query: Query): Promise<({
        client: {
            id: string;
            name: string;
            billing_address: string;
            shipping_address: string;
            shipping_city: string;
            shipping_state: string;
            shipping_zip: string;
            shipping_country: string;
            contact_person: string;
            email: string;
            phone: string;
        };
        creator: {
            id: string;
            username: string;
            email: string;
            password: string;
            role: string;
            company_id: string;
        };
        line_items: {
            id: string;
            description: string;
            quantity: number;
            unit_price: import("@prisma/client/runtime/library").Decimal;
            tax_rate: import("@prisma/client/runtime/library").Decimal;
            invoice_id: string;
        }[];
    } & {
        id: string;
        invoice_number: string;
        date: Date;
        due_date: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        isRead: boolean;
        client_id: string;
        creator_id: string;
        company_id: string;
        templateVersion: import(".prisma/client").$Enums.TemplateVersion;
    })[] | "No matching invoices found.">;
    getOneInvoice(id: string): Promise<{
        invoice: any;
    }>;
    createInvoice(createInvoiceDto: CreateInvoiceDto, validatedUser: ValidatedUser): Promise<any>;
    updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<any>;
    deleteInvoice(id: string): Promise<{
        message: string;
    }>;
}
export {};
