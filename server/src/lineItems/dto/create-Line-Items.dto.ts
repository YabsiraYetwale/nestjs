import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
export class CreateLineItemsDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
  @ApiProperty()
  @IsNotEmpty()
  unit_price: number;
  @ApiProperty()
  @IsNotEmpty()
  tax_rate: number;
  @ApiProperty()
  @IsNotEmpty()
  invoice_id: string;

 
}