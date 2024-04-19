import { registerAs } from '@nestjs/config';

export default registerAs('Auth', () => ({
  jwksUri:
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
}));
