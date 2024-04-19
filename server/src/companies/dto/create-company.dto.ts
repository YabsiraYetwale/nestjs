import {IsNotEmpty,IsOptional,ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RegisterUserDto } from 'src/auth/dto/register.dto';
export class CreateCompanyDto {
  @ApiProperty()
  @IsOptional()
  company_logo: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  company_number: string;
  @ApiProperty()
  @IsOptional()
  vat_reg_number: string;
  @ApiProperty()
  @IsOptional()
  tel1: string;
  @ApiProperty()
  @IsNotEmpty()
  tel2: string;
  @ApiProperty()
  @IsNotEmpty()
  subcity: string;
  @ApiProperty()
  @IsNotEmpty()
  kebele: string;
  @ApiProperty({ type: [RegisterUserDto] })
  @ValidateNested({ each: true })
  @Type(() => RegisterUserDto)
  users: RegisterUserDto;
}
