import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards} from '@nestjs/common';
import { AdditionalFieldsService } from './additionalFields.service';

@Controller('items')
export class AdditionalFieldsController {
  constructor(private additionalFields: AdditionalFieldsService) {}

  @Post('custom')
  async createCustomField(@Body() fields: any) {
    return this.additionalFields.createCustomField(fields);
  }

  @Get('custom')
  getCustomField(){
   return this.additionalFields.getCustomField();
  }

  @Get('custom/:company_id')
  async getAdditionalFieldsByCompanyId(@Param('company_id') companyId: string) {
    return  this.additionalFields.getAdditionalFieldsByCompanyId(companyId);
  }
  @Delete('custom/:id')
  deleteCustomField(@Param() id:string){
    return this.additionalFields.deleteCustomField(id);
   }

};
