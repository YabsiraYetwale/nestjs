import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards} from '@nestjs/common';
import { JwtAdminGuard, JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-Client.dto';
// import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}
 @Get()
 getAllClients(){
  return this.clientsService.getAllClients()
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
 updateClient(@Param() id:string, @Body() updateClientDto:CreateClientDto){
  return this.clientsService.updateClient(id,updateClientDto)
 }
 @Delete(':id')
 @UseGuards(JwtAdminGuard)
 deleteClient(@Param() id:string){
  return this.clientsService.deleteClient(id)
 }
}
