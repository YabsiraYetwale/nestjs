import { CreateLineItemDto } from './create-Line-Items.dto';
import { CreateClientDto } from 'src/clients/dto/create-Client.dto';
export declare class CreateInvoiceDto {
    invoice_number: string;
    isRead: boolean;
    status: string;
    date: Date;
    due_date: Date;
    total_amount: number;
    creator_id: string;
    company_id: string;
    creator: any;
    company: any;
    templateVersion: string;
    line_items: CreateLineItemDto[];
    client: CreateClientDto;
}
