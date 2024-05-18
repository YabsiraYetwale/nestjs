import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-Client.dto';
import { Query as expressQuery } from 'express-serve-static-core';
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    getAllClients(searchQuery: string, query: expressQuery): Promise<any>;
    getOneClient(id: string): Promise<{
        client: any;
    }>;
    createClient(createClientDto: CreateClientDto): Promise<any>;
    updateClient(id: string, updateClientDto: UpdateClientDto): Promise<any>;
    deleteClient(id: string): Promise<{
        message: string;
    }>;
}
