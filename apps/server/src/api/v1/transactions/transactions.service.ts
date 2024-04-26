import { Injectable } from '@nestjs/common';
import { TransactionsRepositoryService } from '../../../repositories/transactions-repository.service';

@Injectable()
export class TransactionsService {
  constructor(
    private transactionsRepositoryService: TransactionsRepositoryService
  ) {}

  getTransactions(fromDate: string) {
    return this.transactionsRepositoryService.getTransactions(
      new Date(fromDate)
    );
  }

  categorizeTransaction(_id: string, category: string) {
    return this.transactionsRepositoryService.categorizeTransaction(
      _id,
      category
    );
  }
}
