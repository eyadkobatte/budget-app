import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';

import { JWT_STRATEGY_INJECTION_TOKEN } from './jwt.strategy.injection';
import { JwtStrategyService } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule],
  providers: [
    JwtStrategyService,
    { provide: JWT_STRATEGY_INJECTION_TOKEN, useValue: passportJwtSecret },
  ],
})
export class AuthModule {}
