import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ArrayNotEmpty, ValidateNested, IsOptional, IsEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLineItemDto {
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
  @IsEmpty()
  tax_rate: number;

  @ApiProperty()
  @IsOptional()
  invoice_id: string;
}

export class CreateLineItemsDto {
  @ApiProperty({ type: [CreateLineItemDto] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLineItemDto)
  lineItems: CreateLineItemDto[];
}



export class CustomFieldsDto {
  @ApiProperty()
  @IsOptional()
  additional_fields: any;
    
  @ApiProperty()
  @IsOptional()
  company_id: any;
}