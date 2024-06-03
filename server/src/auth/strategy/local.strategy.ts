import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(email: string, password: string,res: any) {
    console.log('Inside LocalStrategy');
    const user = this.authService.signin({ email, password },res);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
