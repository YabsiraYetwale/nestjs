/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Company, CompanyUser, User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

interface ValidatedUser extends User {
  companies: Company[];
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'accesssecrettoken',
    });
  }

  async validate(payload: User): Promise<ValidatedUser> {
    console.log('Inside JWT Strategy Validate');

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        companies: {
          include: {
            company: true,
          },
        },
      },
    });

    const validatedUser: ValidatedUser = {
      ...user,
      companies: user.companies.map((cu) => cu.company),
    };

    return validatedUser;
  }
}
