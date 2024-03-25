import { Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-Invoice.dto';
import { UpdateInvoiceDto } from './dto/update-Invoice.dto';

@Injectable()
@Injectable()
export class InvoicesService {
  constructor(
    private prismaService: PrismaService,
  ) {}
async getAllInvoices(){
  const allInvoices = await this.prismaService.Invoices.findMany({include:{line_items:true}})
  return {allInvoices}
}
async getOneInvoice(id:string){
  const invoice = await this.prismaService.Invoices.findUnique({where:id,include:{line_items:true}})
  if (!invoice) {
    throw new HttpException("Invoice doesn't exist",404)
  }
  else{
    return {invoice}
  }
}
async createInvoice(createInvoiceDto:CreateInvoiceDto){
  
  const post = createInvoiceDto
  const newInvoice = await this.prismaService.Invoices.create(
    {data:{...post}}
    )


return {...newInvoice}
}


async updateInvoice(id:string,updateInvoiceDto:UpdateInvoiceDto){
  const post = updateInvoiceDto
  const existingInvoice = await this.prismaService.Invoices.findUnique({ where: id  });
  if (!existingInvoice) {
    throw new HttpException("Invoice doesn't exist", 404);
  }
  const updatedInvoice = await this.prismaService.Invoices.update({where:id,data:{...post}})
  if (!updatedInvoice) {
    throw new Error("Failed to update Invoice");
  }
return {...updatedInvoice}
}
async deleteInvoice(id: string) {
    const existingInvoice = await this.prismaService.Invoices.findUnique({ where: id  });
    if (!existingInvoice) {
      throw new HttpException("Invoice doesn't exist", 404);
    }
  
    const deletedInvoice = await this.prismaService.Invoices.delete({ where: id  });
    if (!deletedInvoice) {
      throw new Error("Failed to delete Invoice");
    } else {
      return { message: "Invoice deleted successfully" };
    } 
} 
  
}
