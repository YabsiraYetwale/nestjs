import { Query } from 'express-serve-static-core';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-Client.dto';
export declare class ClientsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllClients(searchQuery: string, query: Query): Promise<any>;
    getOneClient(id: string): Promise<{
        client: any;
    }>;
    createClient(createClientDto: CreateClientDto): Promise<any>;
    updateClient(id: string, updateClientDto: UpdateClientDto): Promise<any>;
    deleteClient(id: string): Promise<{
        message: string;
    }>;
}
