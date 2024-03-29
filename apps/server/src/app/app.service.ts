import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sanityCheck(): { message: string } {
    return { message: 'Hello API' };
  }
}
