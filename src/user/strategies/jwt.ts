import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtUserStrategy extends PassportStrategy(
  Strategy
) {


  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'secretKey',
    });
  }

  async validate(user: any) {
    if (!user) {
      throw new UnauthorizedException({
        status: 'error',
        message: 'unauthorized',
      });
    }
    return user;
  }
}
