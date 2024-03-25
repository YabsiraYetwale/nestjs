import { IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
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
    @MaxLength(100, { message: 'must be a maximum of 100 characters' })
    contact_person:string 
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, { message: 'Email must be a maximum of 100 characters' })
    email:string 
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20, { message: 'Phone must be a maximum of 20 characters' })
    phone:string 
  }