import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAdminGuard, JwtAuthGuard } from './guards/jwt.guard';
import { LoginUserDto } from './dto/login.dto';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
 registerUser(@Body() createCompanyDto: CreateCompanyDto){
  return this.authService.registerUser(createCompanyDto)
 }
@Post('login')
// @UseGuards(LocalGuard)
 loginUser(@Req() req: Request,@Body() loginUserDto:LoginUserDto){
  return this.authService.loginUser(loginUserDto)
 }

  @Get('/user/current-user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() req: Request) {
    console.log('Inside AuthController status method');
    // console.log(req.user);
    return req.user;
  }

  @Get()
  getAllUsers(){
   return this.authService.getAllUsers()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOneUser(@Param() id:string){
   return this.authService.getOneUser(id)
  }
  @Put(':id')
  @UseGuards(JwtAdminGuard)
  updateUser(@Param() id:string, @Body() updateUserDto:RegisterUserDto){
   return this.authService.updateUser(id,updateUserDto)
  }
  @Delete(':id')
  @UseGuards(JwtAdminGuard)
  deleteUser(@Param() id:string){
   return this.authService.deleteUser(id)
  }
}

