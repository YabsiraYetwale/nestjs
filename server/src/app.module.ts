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
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    TemplateVersionModule,
    MulterModule.register({ dest: './dist/uploads' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    })
  ],
  controllers: [AppController],
})
export class AppModule {}

