import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from 'prisma/prisma.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesStatusModule } from './invoices/status/invoices-Status.module';
import { LineItemsModule } from './lineItems/lineItems.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CompaniesModule } from './companies/companies.module';
import { MailerModule } from './mailer/mailer.module';
import {TemplateVersionModule  } from './template-version/template-version.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    ClientsModule,
    InvoicesModule,
    InvoicesStatusModule,
    LineItemsModule,
    PrismaModule,
    NotificationsModule,
    CompaniesModule,
    MailerModule,
    TemplateVersionModule
  ],
})
export class AppModule {}

