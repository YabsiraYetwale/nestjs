import { Controller, Get,Post,Put,Delete ,Param,Body,Query, UseGuards} from '@nestjs/common';
import { JwtAdminGuard, JwtAuthGuard } from '../auth/guards/jwt.guard';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto} from './dto/create-Invoice.dto';
import { UpdateInvoiceDto } from './dto/update-Invoice.dto';
import { Query as expressQuery} from 'express-serve-static-core';

@Controller('invoices')
export class InvoicesController{
  constructor(private invoicesService: InvoicesService) {}

 @Get()
async getAllInvoices(  @Query('searchQuery') searchQuery: string,@Query() query: expressQuery,
)
 {
  return this.invoicesService.getAllInvoices(searchQuery,query);
}
 @Get(':id')
 @UseGuards(JwtAuthGuard)
 getOneInvoice(@Param() id:string){
  return this.invoicesService.getOneInvoice(id)
 }
 @Post()
 @UseGuards(JwtAdminGuard)
 createInvoice(@Body() createInvoiceDto:CreateInvoiceDto){
  return this.invoicesService.createInvoice(createInvoiceDto)
 }

 @Put(':id')
 @UseGuards(JwtAdminGuard)
 updateInvoice(@Param() id:string, @Body() updateInvoiceDto:UpdateInvoiceDto){
  return this.invoicesService.updateInvoice(id,updateInvoiceDto)
 }
 @Delete(':id')
 @UseGuards(JwtAdminGuard)
 deleteInvoice(@Param() id:string){
  return this.invoicesService.deleteInvoice(id)
 }
}
