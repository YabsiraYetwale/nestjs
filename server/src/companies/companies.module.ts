import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService,AuthService,MailerService],
})
export class CompaniesModule {}
