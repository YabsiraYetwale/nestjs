import {IsDateString,IsEmpty, IsNotEmpty, IsNumber, IsOptional, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class  CreateInvoiceDto{
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20, { message: 'invoice_number must be a maximum of 20 characters' })
    invoice_number :string 
    @ApiProperty()
    @IsOptional()
    status:string
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date:Date
    @IsNotEmpty()
    @IsDateString()
    due_date:Date
    @ApiProperty()
    @IsNumber()
    total_amount:number
    @ApiProperty()
    @IsNotEmpty()
    client_id :string 
    @ApiProperty()
    @IsEmpty()
    id :string 
}
  



