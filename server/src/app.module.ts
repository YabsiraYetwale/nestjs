import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from 'prisma/prisma.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesStatusModule } from './invoices/status/invoices-Status.module';
import { LineItemsModule } from './lineItems/lineItems.module';

@Module({
  imports: [
    AuthModule,
    ClientsModule,
    InvoicesModule,
    InvoicesStatusModule,
    LineItemsModule,
    PrismaModule,
  ],
})
export class AppModule {}
