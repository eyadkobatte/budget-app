import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { JWT_STRATEGY_INJECTION_TOKEN } from './jwt.strategy.injection';
import { ExpressJwtOptions } from 'jwks-rsa';
import { GetVerificationKey } from 'express-jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from '../configuration/auth.config';
import { AuthPayload } from './payload.interface';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private authConfiguration: ConfigType<typeof authConfig>,

    @Inject(JWT_STRATEGY_INJECTION_TOKEN)
    private passportJwtSecret: (
      options: ExpressJwtOptions
    ) => GetVerificationKey
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: authConfiguration.jwksUri,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['none'],
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: AuthPayload) {
    return payload;
  }
}
