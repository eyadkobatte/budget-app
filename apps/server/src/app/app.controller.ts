import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { GocardlessService } from '../clients/gocardless.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly goCardless: GocardlessService
  ) {}

  @Get()
  sanityCheck() {
    return this.appService.sanityCheck();
  }

  @Get('connect')
  connect() {
    return this.goCardless.setupBank();
  }
}
