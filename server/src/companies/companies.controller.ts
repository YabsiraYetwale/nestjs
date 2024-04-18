import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAdminGuard, JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies(){
   return this.companiesService.getAllCompanies()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOneCompany(@Param() id:string){
   return this.companiesService.getOneCompany(id)
  }
  @Patch(':id')
  @UseGuards(JwtAdminGuard)
  updateUser(@Param() id:string, @Body() updateCompanyDto:UpdateCompanyDto){
   return this.companiesService.updateCompany(id,updateCompanyDto)
  }
  @Delete(':id')
  @UseGuards(JwtAdminGuard)
  deleteUser(@Param() id:string){
   return this.companiesService.deleteCompany(id)
  }
}
