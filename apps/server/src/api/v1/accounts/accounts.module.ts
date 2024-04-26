import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountSyncModule } from '../../../account-sync/account-sync.module';

@Module({
  imports: [AccountSyncModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
