import { Injectable } from '@nestjs/common';
import { AccountSyncService } from '../../../account-sync/account-sync.service';

@Injectable()
export class AccountsService {
  constructor(private accountSyncService: AccountSyncService) {}

  syncAllAccounts() {
    return this.accountSyncService.syncAllAccounts();
  }
}
