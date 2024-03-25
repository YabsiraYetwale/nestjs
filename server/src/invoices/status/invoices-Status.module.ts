import { Module } from '@nestjs/common';
import { InvoicesStatusService } from './invoices-Status.service';
import { InvoicesStatusController } from './invoices-Status.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [InvoicesStatusController],
  providers: [InvoicesStatusService],
})
export class InvoicesStatusModule {}