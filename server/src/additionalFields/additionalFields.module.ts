import { Module } from '@nestjs/common';
import { AdditionalFieldsService } from './additionalFields.service';
import { AdditionalFieldsController } from './additionalFields.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [AdditionalFieldsController],
  providers: [AdditionalFieldsService],
})
export class AdditionalFieldsModule {}