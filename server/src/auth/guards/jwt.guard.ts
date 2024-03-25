import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// AuthGuard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside JWT AuthGuard canActivate');
    return super.canActivate(context);
  }
}

// AdminGuard
@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any) {
    if (err || user.role !== 'admin') {
      throw err || new UnauthorizedException('You are not an admin');
    }
    return user;
  }
}
