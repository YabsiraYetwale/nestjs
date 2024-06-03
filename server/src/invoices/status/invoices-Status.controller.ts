import { Controller,Put,Param} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { InvoicesStatusService } from './invoices-Status.service';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';

@RequiredPermission('can_update_invoiceStatus')
@UseGuards(AtGuards, PermissionGuard)
@Controller('invoices')
export class InvoicesStatusController {
  constructor(private invoicesStatusService: InvoicesStatusService) {}
 @Put(':id/mark-as-paid')
 MarkInvoicepaid(@Param() id:string){
  return this.invoicesStatusService.MarkInvoicepaid(id)
}
@Put(':id/mark-as-unpaid')
 MarkInvoiceunpaid(@Param() id:string){
  return this.invoicesStatusService.MarkInvoiceunpaid(id)
}
@Put(':id/mark-as-read')
 MarkInvoiceRead(@Param() id:string){
  return this.invoicesStatusService.MarkInvoiceRead(id)
 }
}