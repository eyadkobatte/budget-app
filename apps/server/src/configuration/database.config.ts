import { registerAs } from '@nestjs/config';

export default registerAs('Database', () => ({
  url: process.env.MONGO_URL as string,
}));
