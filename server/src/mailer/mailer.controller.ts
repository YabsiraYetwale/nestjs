/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { sendEmail } from './dto/mailer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';



@ApiTags('mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  @ApiOperation({ summary: 'Send email' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: sendEmail })
  sendMail(@Body() dto: sendEmail) {
    return this.mailerService.sendMailer(dto);
  }

  // @UseGuards(AtGuards, PermissionGuard)
  // @RequiredPermission('can_email_invoice')
  @Get(':id')
  sendInvoiceEmail(@Param() id:string){
    return  this.mailerService.sendInvoiceEmail(id)
  }
}
