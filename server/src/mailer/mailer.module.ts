/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';
import { InvoicesService } from 'src/invoices/invoices.service';
import { ClientsService } from 'src/clients/clients.service';

@Module({
  imports:[ConfigModule.forRoot()],
  controllers: [MailerController],
  providers: [MailerService,InvoicesService,ClientsService],
})
export class MailerModule {}
