import { IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class  CreateClientDto{
    @ApiProperty()
    @IsNotEmpty()
    name:string 
    @ApiProperty()
    @IsNotEmpty()
    billing_address:string 
    @ApiProperty()
    @IsNotEmpty()
    contact_person:string 
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string 
    @ApiProperty()
    @IsNotEmpty()
    phone:string 
  }