import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RegisterUserDto } from 'src/auth/dto/register.dto';

export class DocumentDto {
 
  @ApiProperty()
  @IsOptional()
  file_name: string;
  @ApiProperty()
  @IsOptional()
  file_path: string;
}

export class CreateCompanyDto {
  @ApiProperty()
  @IsOptional()
  company_logo: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  general_manager_name: string;
  @ApiProperty()
  @IsNotEmpty()
  company_number: string;
  @ApiProperty()
  @IsNotEmpty()
  vat_reg_number: string;
  @ApiProperty()
  @IsNotEmpty()
  house_no: string;
  @ApiProperty()
  @IsNotEmpty()
  po_box: string;
  @ApiProperty()
  @IsNotEmpty()
  fax: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsOptional()
  tel1: string;
  @ApiProperty()
  @IsOptional()
  tel2: string;
  @ApiProperty()
  @IsNotEmpty()
  country: string;
  @ApiProperty()
  @IsNotEmpty()
  region: string;
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  @ApiProperty()
  @IsNotEmpty()
  subcity: string;
  @ApiProperty()
  @IsNotEmpty()
  woreda: string;
  @ApiProperty()
  @IsNotEmpty()
  kebele: string;
  @ApiProperty()
  @IsOptional()
  description: string;
  
  @ApiProperty()
  @IsOptional()
  additional_fields: any;
  @ApiProperty({ type: [RegisterUserDto] })
  @ValidateNested({ each: true })
  @Type(() => RegisterUserDto)
  users: RegisterUserDto;
 
  @ApiProperty({ type: [DocumentDto ] })
  // @ArrayNotEmpty()
  // @ValidateNested({ each: true })
  // @Type(() => DocumentDto )
  @IsOptional()
  documents: DocumentDto []
}

