import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/accounts')
@UseGuards(AuthGuard('jwt'))
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('sync')
  syncAllAccounts() {
    return this.accountsService.syncAllAccounts();
  }
}
