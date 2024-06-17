import { Injectable, HttpException} from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsService } from 'src/clients/clients.service';





@Injectable()
export class RecieptsService {
  constructor(private prismaService: PrismaService,private clientsService: ClientsService) {}
  
async getAllReciepts(searchQuery: string, query: Query) {
  let whereCondition = {};
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    whereCondition = {
      OR: [
        {
          due_date: {
            contains: lowercaseQuery,
          },
        },
        {
          status: {
            contains: lowercaseQuery,
          },
        },
        {
          invoice_number: {
            contains: lowercaseQuery,
          },
        },
        {
          client_id: {
            contains: lowercaseQuery,
          },
        },
      ],
    };
  }
  whereCondition = {
    ...whereCondition,
    status: "paid",
  };

  const reciepts = await this.prismaService.invoices.findMany({
    where: whereCondition,
    include: { line_items: true, client: true,creator: true, },
  });

  if (!searchQuery) {
    return {reciepts}
  };

  return reciepts.length > 0 ? {reciepts} : 'No matching reciepts found.';
}
  async getOneReciept(id: string) {
    const reciepts = await this.prismaService.Invoices.findUnique({
      where: id,
      include: { line_items: true, client: true,creator: true,company: true, },
    });
    if (!reciepts) {
      throw new HttpException("reciepts doesn't exist", 404);
    } else {
      return { reciepts };
    }
  } 

  async getRecieptsByCompanyId(companyId: string) {
    const reciepts = await this.prismaService.Invoices.findMany({
      where: {
        company_id: companyId,
      },
    })
    return {reciepts};
  }

}