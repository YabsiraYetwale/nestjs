import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-Invoice.dto';
import { UpdateInvoiceDto } from './dto/update-Invoice.dto';
import { Query as expressQuery } from 'express-serve-static-core';
export declare class InvoicesController {
    private invoicesService;
    constructor(invoicesService: InvoicesService);
    getAllInvoices(searchQuery: string, query: expressQuery): Promise<"No matching invoices found." | ({
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
        line_items: {
            id: string;
            description: string;
            quantity: number;
            unit_price: import("@prisma/client/runtime/library").Decimal;
            tax_rate: import("@prisma/client/runtime/library").Decimal;
            invoice_id: string;
        }[];
        creator: {
            id: string;
            name: string;
            email: string;
            emailVerified: Date;
            password: string;
            image: string;
            createdAt: Date;
            updatedAt: Date;
            company_id: string;
        };
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
    })[]>;
    getOneInvoice(id: string): Promise<{
        invoice: any;
    }>;
    createInvoice(createInvoiceDto: CreateInvoiceDto, request: any): Promise<any>;
    updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<any>;
    deleteInvoice(id: string): Promise<{
        message: string;
    }>;
}
