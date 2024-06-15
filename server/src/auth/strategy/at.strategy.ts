/* eslint-disable prettier/prettier */


// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { User } from '@prisma/client';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class AtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'accesssecrettoken',
//     });
//   }

//   validate(payload: User) {
//     console.log('Inside JWT Strategy Validate');
//     return payload;
//   }
//   }






/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Company, CompanyUser, User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaClient } from '@prisma/client'; // Import the Prisma client

const prisma = new PrismaClient();


interface ValidatedUser extends User {}


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'accesssecrettoken',
    });
  }

 
  
}
