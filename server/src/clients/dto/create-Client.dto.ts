import { IsEmail, IsNotEmpty, IsOptional, MaxLength, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class  CreateClientDto{
    @ApiProperty()
    @IsOptional()
    name:string 
    @ApiProperty()
    @IsOptional()
    billing_address:string 
    @ApiProperty()
    @IsOptional()
    @MaxLength(100, { message: 'must be a maximum of 100 characters' })
    contact_person:string 
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    @MaxLength(100, { message: 'Email must be a maximum of 100 characters' })
    email:string 
    @ApiProperty()
    @IsOptional()
    @MaxLength(20, { message: 'Phone must be a maximum of 20 characters' })
    phone:string 
    @ApiProperty()
    @IsOptional()
    shipping_address:string
    @ApiProperty()
    @IsOptional()
    shipping_city:string 
    @ApiProperty()  
    @IsOptional()
    shipping_state:string 
    @ApiProperty()  
    @IsOptional()
    shipping_zip:string
    @ApiProperty() 
    @IsOptional()   
    shipping_country:string
  }
// export class  CreateClientDto{
//     @ApiProperty()
//     @IsNotEmpty()
//     name:string 
//     @ApiProperty()
//     @IsNotEmpty()
//     billing_address:string 
//     @ApiProperty()
//     @IsNotEmpty()
//     @MaxLength(100, { message: 'must be a maximum of 100 characters' })
//     contact_person:string 
//     @ApiProperty()
//     @IsEmail()
//     @IsNotEmpty()
//     @MaxLength(100, { message: 'Email must be a maximum of 100 characters' })
//     email:string 
//     @ApiProperty()
//     @IsNotEmpty()
//     @MaxLength(20, { message: 'Phone must be a maximum of 20 characters' })
//     phone:string 
//     @ApiProperty()
//     @IsNotEmpty()
//     shipping_address:string
//     @ApiProperty()
//     @IsNotEmpty()
//     shipping_city:string 
//     @ApiProperty()  
//     @IsNotEmpty()
//     shipping_state:string 
//     @ApiProperty()  
//     @IsNotEmpty()
//     shipping_zip:string
//     @ApiProperty() 
//     @IsNotEmpty()   
//     shipping_country:string
//   }

  export class CreateClientsDto {
    @ApiProperty({ type: [CreateClientDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateClientDto)
    client: CreateClientDto;
  }