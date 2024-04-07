import { Module } from '@nestjs/common';
import { AccountSyncService } from './account-sync.service';
import { ClientsModule } from '../clients/clients.module';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [ClientsModule, RepositoriesModule],
  providers: [AccountSyncService],
})
export class AccountSyncModule {}
