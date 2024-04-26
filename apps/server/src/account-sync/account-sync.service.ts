import { Injectable } from '@nestjs/common';
import { GocardlessService } from '../clients/gocardless.service';
import { TransactionsRepositoryService } from '../repositories/transactions-repository.service';
import { RequisitionsRepositoryService } from '../repositories/requisitions-repository.service';
import { TransactionFormatter } from './transaction-formatter/transaction-formatter.class';

@Injectable()
export class AccountSyncService {
  constructor(
    private goCardlessService: GocardlessService,
    private transactionsRepository: TransactionsRepositoryService,
    private requisitionsRepository: RequisitionsRepositoryService
  ) {}

  async syncAllAccounts() {
    const requisitions = await this.requisitionsRepository.getAllRequisitions();
    await Promise.all(
      requisitions.map((requisition) => this.syncAccount(requisition.accountId))
    );
  }

  async syncAccount(accountId: string) {
    const transactionsResponse =
      await this.goCardlessService.getBankTransactionsPerAccount(accountId);
    const formatter = new TransactionFormatter();
    const formattedTransactions = formatter.fromBankTransactionsToTransactions(
      transactionsResponse,
      accountId
    );
    console.log({
      message: 'Syncing Account',
      count: formattedTransactions.length,
    });
    await this.transactionsRepository.upsertTransactions(formattedTransactions);
  }
}
