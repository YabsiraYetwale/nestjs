/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  UseGuards,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';
import { CreateCompanyDto } from './dto/create-company.dto';

// @UseGuards(AtGuards, PermissionGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // @RequiredPermission('can_read_companies')
  @Get()
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  // @RequiredPermission('can_read_company')
  @Get(':id')
  getOneCompany(@Param() id: string) {
    return this.companiesService.getOneCompany(id);
  }
  @Get('user/:userId')
  async getCompaniesByUserId(@Param('userId') userId: string) {
    return  this.companiesService.getCompaniesByUserId(userId);
  }

  @Post()
  createCompany(@Body() createCompanyDto:CreateCompanyDto){
   return this.companiesService.createCompany(createCompanyDto)
  }

  // @RequiredPermission('can_update_company')
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_name', maxCount: undefined },
        { name: 'company_logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      },
    ),
  )
  updateCompany(
    @Param() id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFiles()
    files: {
      file_name?: Express.Multer.File[];
      company_logo?: Express.Multer.File[];
    },
    @Req() request: Request,
  ) {
    console.log('updated');
    return this.companiesService.updateCompany(
      id,
      updateCompanyDto,
      files?.file_name,
      files?.company_logo,
      request,
    );
  }

  // @RequiredPermission('can_delete_company')
  @Delete(':id')
  deleteCompany(@Param() id: string) {
    return this.companiesService.deleteCompany(id);
  }
}
