/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RegistrationUserDto } from 'src/auth/dto/registration.dto';

export class DocumentDto {
  @ApiProperty({
    description: 'The name of the file',
    example: 'document.pdf',
  })
  @IsOptional()
  file_name: string;

  @ApiProperty({
    description: 'The path to the file',
    example: '/uploads/documents/document.pdf',
  })
  @IsOptional()
  file_path: string;
}

export class CreateCompanyDto {
  @ApiProperty({
    description: 'URL of the company logo',
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  company_logo: string;

  @ApiProperty({
    description: 'The name of the company',
    example: 'Acme Corporation',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Name of the general manager',
    example: 'John Doe',
  })
  @IsNotEmpty()
  general_manager_name: string;

  @ApiProperty({
    description: 'Company registration number',
    example: '1234567890',
  })
  @IsNotEmpty()
  company_number: string;

  @ApiProperty({
    description: 'VAT registration number',
    example: 'VAT123456789',
  })
  @IsNotEmpty()
  vat_reg_number: string;

  @ApiProperty({
    description: 'House number of the company address',
    example: '1234',
  })
  @IsNotEmpty()
  house_no: string;

  @ApiProperty({
    description: 'PO Box number of the company',
    example: 'PO Box 5678',
  })
  @IsNotEmpty()
  po_box: string;

  @ApiProperty({
    description: 'Fax number of the company',
    example: '+123456789',
  })
  @IsNotEmpty()
  fax: string;

  @ApiProperty({
    description: 'Email address of the company',
    example: 'info@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Primary telephone number of the company',
    example: '+123456789',
  })
  @IsOptional()
  tel1: string;

  @ApiProperty({
    description: 'Secondary telephone number of the company',
    example: '+987654321',
  })
  @IsOptional()
  tel2: string;

  @ApiProperty({
    description: 'Country where the company is located',
    example: 'USA',
  })
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'Region where the company is located',
    example: 'California',
  })
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    description: 'City where the company is located',
    example: 'Los Angeles',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Subcity where the company is located',
    example: 'Hollywood',
  })
  @IsNotEmpty()
  subcity: string;

  @ApiProperty({
    description: 'Woreda where the company is located',
    example: 'Woreda 1',
  })
  @IsNotEmpty()
  woreda: string;

  @ApiProperty({
    description: 'Kebele where the company is located',
    example: 'Kebele 15',
  })
  @IsNotEmpty()
  kebele: string;

  @ApiProperty({
    description: 'Description of the company',
    example: 'A leading company in the tech industry.',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Any additional fields related to the company',
    example: {},
  })
  @IsOptional()
  additional_fields: any;

  @ApiProperty({
    description: 'List of users associated with the company',
    type: [RegistrationUserDto],
  })
  @ValidateNested({ each: true })
  @Type(() => RegistrationUserDto)
  users: RegistrationUserDto[];

  @ApiProperty({
    description: 'List of documents related to the company',
    type: [DocumentDto],
  })
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  @IsOptional()
  documents: DocumentDto[];
}
