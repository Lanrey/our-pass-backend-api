import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config/keys';

export class JwtUserStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(user: any) {
    console.log({ user });
    if (!user) {
      throw new UnauthorizedException({
        status: 'error',
        message: 'unauthorized',
      });
    }
    return user;
  }
}