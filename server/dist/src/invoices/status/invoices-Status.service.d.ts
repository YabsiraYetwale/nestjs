import { PrismaService } from 'prisma/prisma.service';
export declare class InvoicesStatusService {
    private prismaService;
    constructor(prismaService: PrismaService);
    MarkInvoicepaid(id: string): Promise<any>;
    MarkInvoiceunpaid(id: string): Promise<any>;
    MarkInvoiceRead(id: string): Promise<any>;
}
