import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsService } from 'src/clients/clients.service';
import { RecieptsController} from './reciepts.controller';
import { RecieptsService } from './reciepts.service';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [RecieptsController],
  providers: [RecieptsService,ClientsService],
})
export class RecieptsModule {}