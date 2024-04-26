import { Module } from '@nestjs/common';
import { TemplateVersionService } from './template-version.service';
import { TemplateVersionController } from './template-version.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    PrismaModule
  ],
  controllers: [TemplateVersionController],
  providers: [TemplateVersionService],
})
export class TemplateVersionModule {}