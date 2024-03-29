import { registerAs } from '@nestjs/config';

export default registerAs('GoCardless', () => ({
  secretId: process.env.GOCARDLESS_SECRET_ID as string,
  secretKey: process.env.GOCARDLESS_SECRET_KEY as string,
  baseUrl: 'https://bankaccountdata.gocardless.com/api/v2',
}));
