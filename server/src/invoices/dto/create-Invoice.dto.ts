
import {ArrayNotEmpty, IsDateString,IsEmpty,IsNotEmpty, IsNumber, IsOptional, MaxLength, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLineItemDto } from './create-Line-Items.dto';
import { Type } from 'class-transformer';
import { CreateClientDto } from 'src/clients/dto/create-Client.dto';
export class CreateInvoiceDto {
    @ApiProperty()
    @IsEmpty()
    invoice_number: string;

    @ApiProperty()
    @IsEmpty()
    isRead : boolean;
    
    @ApiProperty()
    @IsOptional()
    status: string;
     
    @ApiProperty()
    @IsEmpty()
    date: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    due_date: Date;
  
    @ApiProperty()
    total_amount: number;
    
    // @ApiProperty()
    // @IsOptional()
    // client_id: string;
    @ApiProperty()
    @IsEmpty()
    creator_id :string;   
    @ApiProperty()
    @IsEmpty()
    company_id :string;
    @ApiProperty()
    @IsEmpty()
    creator :any;   
    @ApiProperty()
    @IsEmpty()
    company :any;

    @ApiProperty()
    @IsOptional()
    templateVersion :string;

    @ApiProperty({ type: [CreateLineItemDto] })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateLineItemDto)
    line_items: CreateLineItemDto[]

  
    @ApiProperty({ type: [CreateClientDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateClientDto)
    client: CreateClientDto;
  }

