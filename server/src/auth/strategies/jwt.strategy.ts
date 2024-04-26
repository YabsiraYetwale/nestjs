import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Company, User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {jwtConstants} from '../constants';
import { PrismaClient } from '@prisma/client'; // Import the Prisma client

const prisma = new PrismaClient();
interface ValidatedUser extends User {
  company: Company;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // validate(payload: User) {
  //   console.log('Inside JWT Strategy Validate');
  //   return payload;
  // }
  
  async validate(payload: User): Promise<ValidatedUser> {
    console.log('Inside JWT Strategy Validate');
    const company: Company | null = await prisma.company.findUnique({
      where: {
        id: payload.company_id,
      },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    const validatedUser: ValidatedUser = {
      ...payload,
      company,
    };

    return validatedUser;
  }
}

