import { CreateLineItemsDto } from './dto/create-Line-Items.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateLineItemsDto } from './dto/update-Line-Items.dto';
export declare class LineItemsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createCustomField(additional_fields: any): Promise<any>;
    getCustomField(): Promise<{
        additional_fields: any;
    }>;
    getAdditionalFieldsByCompanyId(companyId: string): Promise<{
        additionalFields: any;
    }>;
    deleteCustomField(id: any): Promise<{
        message: string;
    }>;
    getAllLineItems(): Promise<{
        allLine_Items: any;
    }>;
    getOneLineItems(id: string): Promise<{
        lineItems: any;
    }>;
    updateLineItems(id: string, updateLineItemsDto: UpdateLineItemsDto): Promise<any>;
    deleteLineItems(id: string): Promise<{
        message: string;
    }>;
    createLineItems(createLineItemsDto: CreateLineItemsDto): Promise<any[]>;
}
