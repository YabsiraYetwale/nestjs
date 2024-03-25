import { Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    private prismaService: PrismaService,
  ) {}
async getAllClients(){
  const allClients = await this.prismaService.Clients.findMany({include:{invoices:true}})
  return {allClients}
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
async updateClient(id:string,updateClientDto:UpdateClientDto){
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