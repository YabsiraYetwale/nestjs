import {IsNotEmpty, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class  CreateInvoiceDto{
    @ApiProperty()
    @IsNotEmpty()
    name:string 
    @ApiProperty()
    @IsNotEmpty()
    invoice_number :string 
    @ApiProperty()
    @IsNotEmpty()
    date:Date
    @IsNotEmpty()
    due_date:Date
    @ApiProperty()
    @IsNumber()
    total_amount:number
    @ApiProperty()
    @IsNotEmpty()
    client_id :string 
  }
  



