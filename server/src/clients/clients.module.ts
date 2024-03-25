import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}