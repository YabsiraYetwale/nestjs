export declare class CreateClientDto {
    name: string;
    billing_address: string;
    contact_person: string;
    email: string;
    phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country: string;
}
export declare class CreateClientsDto {
    client: CreateClientDto;
}
