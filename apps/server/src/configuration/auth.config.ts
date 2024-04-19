import { registerAs } from '@nestjs/config';

export default registerAs('Auth', () => ({
  jwksUri:
    'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com',
}));
