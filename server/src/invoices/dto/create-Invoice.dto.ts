
import {ArrayNotEmpty, IsDateString,IsEmpty,IsNotEmpty, IsNumber, IsOptional, MaxLength, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLineItemDto } from '../../lineItems/dto/create-Line-Items.dto';
import { Type } from 'class-transformer';
import { CreateClientDto } from 'src/clients/dto/create-Client.dto';
export class CreateInvoiceDto {
    @ApiProperty()
    @IsEmpty()
    invoice_number: string;
    @ApiProperty()
    @IsOptional()
    status: string;
  
    @IsNotEmpty()
    @IsDateString()
    due_date: Date;
  
    @ApiProperty()
    total_amount: number;
    
    @ApiProperty()
    @IsOptional()
    client_id: string;
  
    @ApiProperty({ type: [CreateLineItemDto] })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateLineItemDto)
    line_items: CreateLineItemDto[];

  
    @ApiProperty({ type: [CreateClientDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateClientDto)
    client: CreateClientDto;
  }



