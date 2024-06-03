import { Controller, Get,Post,Put,Delete ,Param,Body, UseGuards,Render} from '@nestjs/common';
import { TemplateVersionService } from './template-version.service';


@Controller('templates')
export class TemplateVersionController {
  constructor(private templateVersionService: TemplateVersionService) {}
  @Get('v1/:id')
  @Render('invoice-template-v1')
  // @UseGuards(JwtAuthGuard)
  getTemplateV1(@Param() id:string){
   return this.templateVersionService.getTemplateVersion(id);
  }
  @Get('v2/:id')
  @Render('invoice-template-v2')
  // @UseGuards(JwtAuthGuard)
  getTemplateV2(@Param() id:string){
   return this.templateVersionService.getTemplateVersion(id)
  }
  @Get('v3/:id')
  @Render('invoice-template-v3')
  // @UseGuards(JwtAuthGuard)
  getTemplateV3(@Param() id:string){
   return this.templateVersionService.getTemplateVersion(id)
  }
  @Get('v4/:id')
  @Render('invoice-template-v4')
  // @UseGuards(JwtAuthGuard)
  getTemplateV4(@Param() id:string){
   return this.templateVersionService.getTemplateVersion(id)
  }
  @Get('v5/:id')
  @Render('invoice-template-v5')
  // @UseGuards(JwtAuthGuard)
  getTemplateV5(@Param() id:string){
   return this.templateVersionService.getTemplateVersion(id)
  }
}
