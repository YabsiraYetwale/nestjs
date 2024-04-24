import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards, Query} from '@nestjs/common';
import { JwtAdminGuard, JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-Client.dto';
import { Query as expressQuery} from 'express-serve-static-core';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

@Get()
async getAllClients(  @Query('searchQuery') searchQuery: string,@Query() query: expressQuery)
 {
  return this.clientsService.getAllClients(searchQuery,query);
}
 @Get(':id')
 @UseGuards(JwtAuthGuard)
 getOneClient(@Param() id:string){
  return this.clientsService.getOneClient(id)
 }
 @Post()
 @UseGuards(JwtAdminGuard)
 createClient(@Body() createClientDto:CreateClientDto){
  return this.clientsService.createClient(createClientDto)
 }
 @Put(':id')
 @UseGuards(JwtAdminGuard)
 updateClient(@Param() id:string, @Body() updateClientDto: UpdateClientDto){
  return this.clientsService.updateClient(id,updateClientDto)
 }
 @Delete(':id')
//  @UseGuards(JwtAdminGuard)
 deleteClient(@Param() id:string){
  return this.clientsService.deleteClient(id)
 }
}
