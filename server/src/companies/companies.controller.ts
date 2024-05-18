import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Req, } from '@nestjs/common';
import { JwtAdminGuard, JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies(){
   return this.companiesService.getAllCompanies()
  };

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  getOneCompany(@Param() id:string){
   return this.companiesService.getOneCompany(id)
  }
  @Patch(':id')
  // @UseGuards(JwtAdminGuard)

 
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file_name', maxCount: undefined},
      { name: 'company_logo', maxCount: 1 },
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
  
  updateUser(@Param() id:string,@Body() updateCompanyDto:UpdateCompanyDto, 
 @UploadedFiles()
  files: {
    file_name?: Express.Multer.File[];
    company_logo?: Express.Multer.File[];
  }, 
  @Req() request: Request,
  ){
  
    console.log("updated")
   return this.companiesService.updateCompany(id,updateCompanyDto,files.file_name,files.company_logo,request);
  };
  @Delete(':id')
  @UseGuards(JwtAdminGuard)
  deleteUser(@Param() id:string){
   return this.companiesService.deleteCompany(id)
  }
}
