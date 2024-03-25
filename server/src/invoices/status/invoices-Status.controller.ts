import { Controller,Put,Param} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAdminGuard } from '../../auth/guards/jwt.guard';
import { InvoicesStatusService } from './invoices-Status.service';

@Controller('invoices')
export class InvoicesStatusController {
  constructor(private invoicesStatusService: InvoicesStatusService) {}
 @Put(':id/mark-as-paid')
 @UseGuards(JwtAdminGuard)
 MarkInvoicepaid(@Param() id:string){
  return this.invoicesStatusService.MarkInvoicepaid(id)
}
@Put(':id/mark-as-unpaid')
 @UseGuards(JwtAdminGuard)
 MarkInvoiceunpaid(@Param() id:string){
  return this.invoicesStatusService.MarkInvoiceunpaid(id)
}
@Put(':id/mark-as-read')
 @UseGuards(JwtAdminGuard)
 MarkInvoiceRead(@Param() id:string){
  return this.invoicesStatusService.MarkInvoiceRead(id)
 }
}