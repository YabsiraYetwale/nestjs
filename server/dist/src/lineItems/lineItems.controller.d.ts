import { LineItemsService } from './lineItems.service';
import { CreateLineItemsDto } from '../invoices/dto/create-Line-Items.dto';
import { UpdateLineItemsDto } from './dto/update-Line-Items.dto';
export declare class LineItemsController {
    private lineItemsService;
    constructor(lineItemsService: LineItemsService);
    createCustomField(fields: any): Promise<any>;
    getCustomField(): Promise<{
        additional_fields: any;
    }>;
    getAdditionalFieldsByCompanyId(companyId: string): Promise<{
        additionalFields: any;
    }>;
    deleteCustomField(id: string): Promise<{
        message: string;
    }>;
    getAllLineItems(): Promise<{
        allLine_Items: any;
    }>;
    getOneInvoice(id: string): Promise<{
        lineItems: any;
    }>;
    createLineItems(lineItemsDto: CreateLineItemsDto): Promise<any[]>;
    updateLineItems(id: string, updateLineItemsDto: UpdateLineItemsDto): Promise<any>;
    deleteLineItems(id: string): Promise<{
        message: string;
    }>;
}
