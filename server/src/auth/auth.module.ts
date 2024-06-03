/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/mailer.service';
import { AtStrategy } from './strategy/at.strategy';
import { RtStrategy } from './strategy/rt.strategy';
import { RolesGuard } from './guard/role.guard';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PermissionGuard } from './guard/permission.guard';
import { LocalStrategy } from './strategy/local.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'accesssecrettoken',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule,
  ],
  controllers: [AuthController],
  // providers: [AuthService,JwtService,MailerService,AtStrategy,RtStrategy,RolesGuard],
  providers: [AuthService,MailerService,AtStrategy,LocalStrategy],
})
export class AuthModule {}
