import { Controller, Get,Post,Put,Delete ,Param,Body,Query, UseGuards,Request} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto} from './dto/create-Invoice.dto';
import { UpdateInvoiceDto } from './dto/update-Invoice.dto';
import { Query as expressQuery} from 'express-serve-static-core';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';

@UseGuards(AtGuards, PermissionGuard)
@Controller('invoices')
export class InvoicesController{
  constructor(private invoicesService: InvoicesService) {}
    
// @RequiredPermission('can_read_invoices')
 @Get()
async getAllInvoices(  @Query('searchQuery') searchQuery: string,@Query() query: expressQuery,
)
 {
  return this.invoicesService.getAllInvoices(searchQuery,query);
}

// @RequiredPermission('can_read_invoice')
 @Get(':id')
 getOneInvoice(@Param() id:string){
  return this.invoicesService.getOneInvoice(id);
 }

//  @RequiredPermission('can_create_invoice')
@UseGuards(AtGuards, PermissionGuard)
 @Post()
 createInvoice(@Body() createInvoiceDto: CreateInvoiceDto, @Request() request) {
   const validatedUser = request.user; 
   return this.invoicesService.createInvoice(createInvoiceDto, validatedUser);
 }

//  @RequiredPermission('can_update_invoice')
 @Put(':id')
 updateInvoice(@Param() id:string, @Body() updateInvoiceDto:UpdateInvoiceDto){
  return this.invoicesService.updateInvoice(id,updateInvoiceDto)
 }

//  @RequiredPermission('can_delete_invoice')
 @Delete(':id')
 deleteInvoice(@Param() id:string){
  return this.invoicesService.deleteInvoice(id)
 }
}