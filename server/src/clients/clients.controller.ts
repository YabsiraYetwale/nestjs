import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards, Query} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-Client.dto';
import { Query as expressQuery} from 'express-serve-static-core';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';

// @UseGuards(AtGuards, PermissionGuard)
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

// @RequiredPermission('can_read_clients')
@Get()
async getAllClients(  @Query('searchQuery') searchQuery: string,@Query() query: expressQuery)
 {
  return this.clientsService.getAllClients(searchQuery,query);
}

// @RequiredPermission('can_read_client')
 @Get(':id')
 getOneClient(@Param() id:string){
  return this.clientsService.getOneClient(id)
 }

//  @RequiredPermission('can_create_client')
 @Post()
 createClient(@Body() createClientDto:CreateClientDto){
  return this.clientsService.createClient(createClientDto)
 }

//  @RequiredPermission('can_update_client')
 @Put(':id')
 updateClient(@Param() id:string, @Body() updateClientDto: UpdateClientDto){
  return this.clientsService.updateClient(id,updateClientDto)
 }

//  @RequiredPermission('can_delete_client')
 @Delete(':id')
 deleteClient(@Param() id:string){
  return this.clientsService.deleteClient(id)
 }
}
