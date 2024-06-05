import { Module } from '@nestjs/common';
import { LineItemsService } from './lineItems.service';
import { LineItemsController } from './lineItems.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [LineItemsController],
  providers: [LineItemsService],
})
export class LineItemsModule {}