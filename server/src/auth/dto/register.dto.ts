import {IsEmail,IsNotEmpty,IsOptional,IsString} from 'class-validator'
export class RegisterUserDto{
    @IsNotEmpty()
    @IsString()
    username:string
    @IsEmail() 
    @IsNotEmpty()
    email :string 
    @IsNotEmpty()
    password :string
    @IsOptional()
    role:string 
}
