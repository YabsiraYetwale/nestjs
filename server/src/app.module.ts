/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from 'prisma/prisma.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesStatusModule } from './invoices/status/invoices-Status.module';
import { RecieptsModule } from './reciepts/reciepts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CompaniesModule } from './companies/companies.module';
import { TemplateVersionModule } from './template-version/template-version.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { MailerModule } from './mailer/mailer.module';
import { AdditionalFieldsModule } from './additionalFields/additionalFields.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ClientsModule,
    InvoicesModule,
    InvoicesStatusModule,
    RecieptsModule,
    PrismaModule,
    NotificationsModule,
    CompaniesModule,
    MailerModule,
    TemplateVersionModule,
    UserModule,
    RoleModule,
    PermissionModule,
    UserRoleModule,
    UserPermissionModule,
    AdditionalFieldsModule,
    MulterModule.register({ dest: './uploads' }),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/uploads`,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
