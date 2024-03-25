import {IsEmail,IsNotEmpty,IsOptional,IsString, MaxLength} from 'class-validator'
export class RegisterUserDto{
    @IsNotEmpty()
    @IsString()
    username:string
    @IsEmail() 
    @IsNotEmpty()
    @MaxLength(100, { message: 'Email must be a maximum of 100 characters' })
    email :string 
    @IsNotEmpty()
    @MaxLength(100, { message: 'password must be a maximum of 100 characters' })
    password :string
    @IsOptional()
    @MaxLength(20, { message: 'Role must be a maximum of 20 characters' })
    role:string 
}
