import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
 registerUser(@Body() registerUserdto:RegisterUserDto){
  return this.authService.registerUser(registerUserdto)
 }
@Post('login')
// @UseGuards(LocalGuard)
 loginUser(@Req() req: Request,@Body() loginUserDto:LoginUserDto){
  return this.authService.loginUser(loginUserDto)
  // return req.user
 }

  @Get('/user/current-user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() req: Request) {
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }

  @Get()
  getAllUsers(){
   return this.authService.getAllUsers()
  }
}

