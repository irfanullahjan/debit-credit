import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth.types';
import { AuthModule } from './auth.module';
import { JWT_COOKIE_NAME } from '../common/constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.fromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: AuthModule.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // TODO: validate the payload
    return { userId: payload.sub, email: payload.email };
  }

  static fromCookie(req: Request) {
    if (req && req.cookies) {
      return req.cookies[JWT_COOKIE_NAME];
    }
  }
}
