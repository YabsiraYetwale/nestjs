import {ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.setGlobalPrefix('api');
  app.enableCors();
  
  app.setViewEngine('ejs');
  app.setBaseViewsDir('templates');
  app.useStaticAssets('public');
  
  await app.listen(3000);
}
bootstrap();