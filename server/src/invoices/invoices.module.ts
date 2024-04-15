import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsService } from 'src/clients/clients.service';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService,ClientsService],
})
export class InvoicesModule {}