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
// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
// import { Type } from 'class-transformer';

// export class CreateLineItemsDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   invoice_id: string;

//   @ApiProperty({ type: [LineItemDto] })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => LineItemDto)
//   items: LineItemDto[];
// }

// export class LineItemDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsArray()
//   @ValidateNested()
//   @Type(() => ItemPriceDto)
//   'items.0.unit_price': number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsArray()
//   @ValidateNested()
//   @Type(() => ItemPriceDto)
//   'items.0.tax_rate': number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsArray()
//   @ValidateNested()
//   @Type(() => ItemPriceDto)
//   'items.0.quantity': number;
// }

// class ItemPriceDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   value: number;
// }