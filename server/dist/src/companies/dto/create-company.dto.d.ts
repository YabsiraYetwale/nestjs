import { RegistrationUserDto } from 'src/auth/dto/registration.dto';
export declare class DocumentDto {
    file_name: string;
    file_path: string;
}
export declare class CreateCompanyDto {
    company_logo: string;
    name: string;
    general_manager_name: string;
    company_number: string;
    vat_reg_number: string;
    house_no: string;
    po_box: string;
    fax: string;
    email: string;
    tel1: string;
    tel2: string;
    country: string;
    region: string;
    city: string;
    subcity: string;
    woreda: string;
    kebele: string;
    description: string;
    additional_fields: any;
    users: RegistrationUserDto[];
    documents: DocumentDto[];
}
