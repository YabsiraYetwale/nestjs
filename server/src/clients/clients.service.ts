import { Injectable,HttpException } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-Client.dto';

@Injectable()
export class ClientsService {
  constructor(
    private prismaService: PrismaService,
  ) {}
async getAllClients(searchQuery: string, query: Query) {
  let whereCondition = {};
  if (searchQuery) {
    const caseInsensitiveSearchQuery = searchQuery.toLowerCase();
    whereCondition = {
      OR: [
        {
          name: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          billing_address: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          contact_person: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          shipping_address: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          shipping_city: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          shipping_zip: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          shipping_state: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
        {
          shipping_country: {
            contains: caseInsensitiveSearchQuery,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  const clients = await this.prismaService.Clients.findMany({
    where: whereCondition,
    include: { invoices: true },
  });

  if (!searchQuery) {
    return {clients};
  }

  return clients.length > 0 ? {clients} : 'No matching clients found.';
}


async getOneClient(id:string){
  const client = await this.prismaService.Clients.findUnique({
    where:id,include:{invoices:true}
  })
  if (!client) {
    throw new HttpException("Client doesn't exist",404)
  }
  else{
    return {client}
  }
}
async createClient(createClientDto:CreateClientDto){
  
  const post = createClientDto
  const newClient = await this.prismaService.Clients.create({data:{...post}})
return {...newClient}
}
async updateClient(id:string,updateClientDto: UpdateClientDto){
  const post = updateClientDto
  const existingClient = await this.prismaService.Clients.findUnique({ where: id  });
  if (!existingClient) {
    throw new HttpException("Client doesn't exist", 404);
  }
  const updatedClient = await this.prismaService.Clients.update({where:id,data:{...post}})
  if (!updatedClient) {
    throw new Error("Failed to update client");
  }
return {...updatedClient}
}
async deleteClient(id: string) {
    const existingClient = await this.prismaService.Clients.findUnique({ where: id  });
    if (!existingClient) {
      throw new HttpException("Client doesn't exist", 404);
    }
  
    const deletedClient = await this.prismaService.Clients.delete({ where: id  });
    if (!deletedClient) {
      throw new Error("Failed to delete client");
    } else {
      return { message: "Client deleted successfully" };
    }
  
}
  
}