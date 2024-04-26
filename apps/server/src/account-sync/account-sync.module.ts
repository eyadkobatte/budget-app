import { Module } from '@nestjs/common';
import { AccountSyncService } from './account-sync.service';
import { ClientsModule } from '../clients/clients.module';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [ClientsModule, RepositoriesModule],
  providers: [AccountSyncService],
  exports: [AccountSyncService],
})
export class AccountSyncModule {}
