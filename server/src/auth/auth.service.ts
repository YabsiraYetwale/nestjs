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
    const existingUserEmail = await this.prismaService.User.findUnique({ where: { email } });
    const existingUserUsername = await this.prismaService.User.findUnique({ where: { username } });
    const hashedPassword = await bcrypt.hash(password, 10)
  
    if (existingUserEmail) {
      throw new HttpException('Email already exists', 409);
    } else if (existingUserUsername) {
      throw new HttpException('Username already exists', 409);
    } else {
      const user = await this.prismaService.User.create({
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
    const existingUser= await this.prismaService.User.findUnique({ where: { email } });
    if (!existingUser) {
       throw new HttpException({message:"User doesn't exist."}, 404);
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

    async getAllUsers(){
      const allUsers = await this.prismaService.User.findMany()
      return {allUsers}
    }

    async getOneUser(id:string){
      const user = await this.prismaService.User.findUnique({where:id})
      if (!user) {
        throw new HttpException("User doesn't exist",404)
      }
      else{
        return {user}
      }
    }
    async updateUser(id:string,updateUserDto:RegisterUserDto){
      const post = updateUserDto
      const existingUser = await this.prismaService.User.findUnique({ where: id  });
      if (!existingUser) {
        throw new HttpException("User doesn't exist", 404);
      }
      const updatedUser = await this.prismaService.User.update({where:id,data:{...post}})
      if (!updatedUser) {
        throw new Error("Failed to update User");
      }
    return {...updatedUser}
    }
    async deleteUser(id: string) {
      const existingUser = await this.prismaService.User.findUnique({where:id});
      if (!existingUser) {
        throw new HttpException("User doesn't exist", 404);
      }
    
      const deletedUser = await this.prismaService.User.delete({ where: id  });
      if (!deletedUser) {
        throw new Error("Failed to delete user");
      } else {
        return { message: "User deleted successfully" };
      }
    
  }
}
