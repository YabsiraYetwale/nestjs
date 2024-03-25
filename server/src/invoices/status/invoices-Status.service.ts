import { Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InvoicesStatusService {
  constructor(
    private prismaService: PrismaService,
  ) {}
async MarkInvoicepaid(id:string){
  const existingInvoiceStatus = await this.prismaService.Invoices.findUnique({ where: id  });
  if (!existingInvoiceStatus) {
    throw new HttpException("InvoiceStatus doesn't exist", 404);
  }
  const updatedInvoiceStatus = await this.prismaService.Invoices.update({where:id,data:{status:"paid"}})
  if (!updatedInvoiceStatus) {
    throw new Error("Failed to update InvoiceStatus");
  }
return {...updatedInvoiceStatus}
} 
async MarkInvoiceunpaid(id:string){
  const existingInvoiceStatus = await this.prismaService.Invoices.findUnique({ where: id  });
  if (!existingInvoiceStatus) {
    throw new HttpException("InvoiceStatus doesn't exist", 404);
  }
  const updatedInvoiceStatus = await this.prismaService.Invoices.update({where:id,data:{status:"unpaid"}})
  if (!updatedInvoiceStatus) {
    throw new Error("Failed to update InvoiceStatus");
  }
return {...updatedInvoiceStatus}
} 
async MarkInvoiceRead(id:string){
  const existingInvoiceStatus = await this.prismaService.Invoices.findUnique({ where: id  });
  if (!existingInvoiceStatus) {
    throw new HttpException("InvoiceStatus doesn't exist", 404);
  }
  const updatedInvoiceStatus = await this.prismaService.Invoices.update({where:id,data:{status:"read"}})
  if (!updatedInvoiceStatus) {
    throw new Error("Failed to update InvoiceStatus");
  }
return {...updatedInvoiceStatus}
} 
}
 
