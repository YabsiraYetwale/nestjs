import { Injectable,HttpException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    private prismaService: PrismaService,
    ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const { username, email, password,role } = registerUserDto;
    const existingUserEmail = await this.prismaService.user.findUnique({ where: { email } });
    const existingUserUsername = await this.prismaService.user.findUnique({ where: { username } });
    const hashedPassword = await bcrypt.hash(password, 10)
  
    if (existingUserEmail) {
      throw new HttpException('Email already exists', 409);
    } else if (existingUserUsername) {
      throw new HttpException('Username already exists', 409);
    } else {
      const user = await this.prismaService.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role
        },
      });
      return { message: 'User registered successfully'};
    }
  }
  async loginUser(loginUserDto: LoginUserDto){
    const {email, password } =loginUserDto;
    const existingUser= await this.prismaService.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new HttpException("User doesn't exist.", 404);
    }
   
    const isPasswordMatch = await bcrypt.compare(password, existingUser?.password);
    if (!isPasswordMatch) {
      throw new HttpException("invalid credentials", 401);
    }
    else if (isPasswordMatch) { 

      const {password,...user}=existingUser;
      const token=this.jwtService.sign({...user});
    return {token};
    }   
    }
}
