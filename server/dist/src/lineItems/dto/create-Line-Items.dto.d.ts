export declare class CreateLineItemDto {
    description: string;
    quantity: number;
    unit_price: number;
    tax_rate: number;
    invoice_id: string;
}
export declare class CreateLineItemsDto {
    lineItems: CreateLineItemDto[];
}
export declare class CustomFieldsDto {
    additional_fields: any;
    company_id: any;
}
