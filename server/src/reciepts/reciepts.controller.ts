import { Controller, Get,Post,Put,Delete ,Param,Body,Query, UseGuards,Request} from '@nestjs/common';

import { Query as expressQuery} from 'express-serve-static-core';
import { RecieptsService } from './reciepts.service';

import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';

// @UseGuards(AtGuards, PermissionGuard)
@Controller('reciepts')
export class RecieptsController{
  constructor(private recieptsService: RecieptsService) {}
    
// @RequiredPermission('can_read_invoices')
 @Get()
async getAllReciepts(  @Query('searchQuery') searchQuery: string,@Query() query: expressQuery,
)
 {
  return this.recieptsService.getAllReciepts(searchQuery,query);
}

// @RequiredPermission('can_read_invoice')
 @Get(':id')
 getOneReciept(@Param() id:string){
  return this.recieptsService.getOneReciept(id);
 }
 @Get('company/:company_id')
 async getRecieptsByCompanyId(@Param('company_id') companyId: string) {
   return  this.recieptsService.getRecieptsByCompanyId(companyId);
 }

}