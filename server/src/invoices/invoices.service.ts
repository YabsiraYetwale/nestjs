import { Injectable, HttpException } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { PrismaService } from 'prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-Invoice.dto';
import { UpdateInvoiceDto } from './dto/update-Invoice.dto';

@Injectable()
@Injectable()
export class InvoicesService {
  constructor(private prismaService: PrismaService) {}
  
  async getAllInvoices(searchQuery: string, query: Query) {
  let whereCondition = {};
  if (searchQuery) {
    whereCondition = {
      OR: [
        {
          date: {
            contains: searchQuery,
          },
        },
        {
          status: {
            contains: searchQuery,
          },
        },
        {
          invoice_number: {
            contains: searchQuery,
          },
        },
      ],
    };
  }
  const invoices = await this.prismaService.invoices.findMany({
    where: whereCondition,
    include: { line_items: true,client: true },
  });

  if (!searchQuery) {
    return invoices;
  }
  return invoices.length > 0 ? invoices : 'No matching invoices found.';
 
}
  async getOneInvoice(id: string) {
    const invoice = await this.prismaService.Invoices.findUnique({
      where: id,
      include: { line_items: true, client: true },
    });
    if (!invoice) {
      throw new HttpException("Invoice doesn't exist", 404);
    } else {
      return { invoice };
    }
  } 
  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const { invoice_number,total_amount,line_items, ...post } = createInvoiceDto;
  
    const existingInvoiceNumber = await this.prismaService.Invoices.findUnique({
      where: { invoice_number },
    });
    if (existingInvoiceNumber) {
      throw new HttpException('Invoice_number should be unique', 409);
    }
  
    const totalAmount = line_items.reduce((total, item) => {
      return total + item.quantity * item.unit_price;
    }, 0);
    const newInvoice = await this.prismaService.Invoices.create({
      data: {
        invoice_number,
        total_amount:totalAmount,
        ...post,
        line_items: {
          create: line_items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            tax_rate: item.tax_rate,
          })),
        },
      },
      include: {
        line_items: true,
      },
    });
  
    return newInvoice;
  }
 
  async updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const { invoice_number,total_amount, line_items, ...post } = updateInvoiceDto;
    const existingInvoice_number = await this.prismaService.Invoices.findUnique({ where: { invoice_number } });  
    if (existingInvoice_number) {
      throw new HttpException('Invoice_number should be unique', 409);
    }
    const existingInvoice = await this.prismaService.Invoices.findUnique({
      where: id,
      include: { line_items: true },
    });
    if (!existingInvoice) {
      throw new HttpException("Invoice doesn't exist", 404);
    }
      await this.prismaService.Line_Items.deleteMany({
      where: { invoice_id: existingInvoice.invoice_number },
    });
    const totalAmount = line_items.reduce((total, item) => {
      return total + item.quantity * item.unit_price;
    }, 0);
    const updatedInvoice = await this.prismaService.Invoices.update({
      where: id,
      data: { 
        invoice_number,
        total_amount:totalAmount,
        ...post,
        line_items: {
          create: line_items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            tax_rate: item.tax_rate,
          })),
        },
      },
    });
    if (!updatedInvoice) {
      throw new Error('Failed to update Invoice');
    }
    return { ...updatedInvoice };
  }
  
  async deleteInvoice(id: string) {
    const existingInvoice = await this.prismaService.Invoices.findUnique({
      where: id,
    });
    if (!existingInvoice) {
      throw new HttpException("Invoice doesn't exist", 404);
    }

    const deletedInvoice = await this.prismaService.Invoices.delete({
      where: id,
    });
    if (!deletedInvoice) {
      throw new Error('Failed to delete Invoice');
    } else {
      return { message: 'Invoice deleted successfully' };
    }
  }
}