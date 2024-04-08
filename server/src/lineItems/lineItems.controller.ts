import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards} from '@nestjs/common';
import { JwtAdminGuard, JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LineItemsService } from './lineItems.service';
import { CreateLineItemsDto} from './dto/create-Line-Items.dto';
import { UpdateLineItemsDto } from './dto/update-Line-Items.dto';

@Controller('items')
export class LineItemsController {
  constructor(private lineItemsService: LineItemsService) {}
  @Get()
  getAllLineItems(){
   return this.lineItemsService.getAllLineItems()
  }
  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  getOneInvoice(@Param() id:string){
   return this.lineItemsService.getOneLineItems(id)
  }
 @Post()
// @UseGuards(JwtAdminGuard)
createLineItems(@Body() lineItemsDto: CreateLineItemsDto) {
  return this.lineItemsService.createLineItems(lineItemsDto);
}
 @Put(':id')
//  @UseGuards(JwtAdminGuard)
 updateLineItems(@Param() id:string, @Body() updateLineItemsDto:UpdateLineItemsDto){
  return this.lineItemsService.updateLineItems(id,updateLineItemsDto)
 }
 @Delete(':id')
//  @UseGuards(JwtAuthGuard)
 deleteLineItems(@Param() id:string){
  return this.lineItemsService.deleteLineItems(id)
 }

}
