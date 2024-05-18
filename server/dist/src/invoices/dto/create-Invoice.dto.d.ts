import { CreateLineItemDto } from '../../lineItems/dto/create-Line-Items.dto';
import { CreateClientDto } from 'src/clients/dto/create-Client.dto';
export declare class CreateInvoiceDto {
    invoice_number: string;
    isRead: boolean;
    status: string;
    date: Date;
    due_date: Date;
    total_amount: number;
    client_id: string;
    creator_id: string;
    company_id: string;
    creator: any;
    company: any;
    line_items: CreateLineItemDto[];
    client: CreateClientDto;
}
