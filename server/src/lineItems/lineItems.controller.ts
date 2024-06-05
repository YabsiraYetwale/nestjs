import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards} from '@nestjs/common';
import { LineItemsService } from './lineItems.service';
import { CreateLineItemsDto} from './dto/create-Line-Items.dto';
import { UpdateLineItemsDto } from './dto/update-Line-Items.dto';

@Controller('items')
export class LineItemsController {
  constructor(private lineItemsService: LineItemsService) {}

  @Post('custom')
  async createCustomField(@Body() fields: any) {
    return this.lineItemsService.createCustomField(fields);
  }

  @Get('custom')
  getCustomField(){
   return this.lineItemsService.getCustomField();
  }

  @Get('custom/:company_id')
  async getAdditionalFieldsByCompanyId(@Param('company_id') companyId: string) {
    return  this.lineItemsService.getAdditionalFieldsByCompanyId(companyId);
  }
  @Delete('custom/:id')
  deleteCustomField(@Param() id:string){
    return this.lineItemsService.deleteCustomField(id);
   }

  @Get()
  getAllLineItems(){
   return this.lineItemsService.getAllLineItems();
  }
  @Get(':id')
  getOneInvoice(@Param() id:string){
   return this.lineItemsService.getOneLineItems(id);
  }
 @Post()
createLineItems(@Body() lineItemsDto: CreateLineItemsDto) {
  return this.lineItemsService.createLineItems(lineItemsDto);
}
 @Put(':id')
 updateLineItems(@Param() id:string, @Body() updateLineItemsDto:UpdateLineItemsDto){
  return this.lineItemsService.updateLineItems(id,updateLineItemsDto)
 }
 @Delete(':id')
 deleteLineItems(@Param() id:string){
  return this.lineItemsService.deleteLineItems(id)
 }
}
