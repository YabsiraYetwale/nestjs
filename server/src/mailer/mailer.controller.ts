import {Controller, Get, Param} from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get(':id')
  sendMail(@Param() id:string){
    return  this.mailerService.sendInvoiceEmail(id)
  }
}
