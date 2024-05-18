import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAdminGuard, JwtAuthGuard } from './guards/jwt.guard';
import { LoginUserDto } from './dto/login.dto';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor([
       { name: 'file_name', maxCount: 1 },
      { name: 'company_logo', maxCount: 1 }
    ], {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
 registerUser(@Body() createCompanyDto: CreateCompanyDto,
 @UploadedFiles()
 files: {
   file_name?: Express.Multer.File[];
   company_logo?: Express.Multer.File[];
 },
 @Req() request: Request,
  ){
  return this.authService.registerUser(createCompanyDto,files.file_name,files.company_logo,request)
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

