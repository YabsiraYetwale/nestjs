import { InvoicesStatusService } from './invoices-Status.service';
export declare class InvoicesStatusController {
    private invoicesStatusService;
    constructor(invoicesStatusService: InvoicesStatusService);
    MarkInvoicepaid(id: string): Promise<any>;
    MarkInvoiceunpaid(id: string): Promise<any>;
    MarkInvoiceRead(id: string): Promise<any>;
}
