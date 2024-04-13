import { Transaction } from '@entities/transaction';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequisitionsRepositoryService } from './requisitions-repository.service';

@Injectable()
export class TransactionsRepositoryService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionsRepository: Model<Transaction>,
    private requisitionsRepositoryService: RequisitionsRepositoryService
  ) {}

  async getTransactions(fromDate: Date) {
    const transactions = await this.transactionsRepository
      .find(
        {
          date: { $gt: fromDate },
        },
        {},
        { limit: 500, sort: { date: -1 } }
      )
      .lean();
    const requisitions =
      await this.requisitionsRepositoryService.getAllRequisitions();
    return transactions.map((transaction) => {
      const accountName = requisitions.find(
        (requisition) => requisition.accountId === transaction.accountId
      ).name;
      return { ...transaction, accountId: accountName };
    });
  }

  async getTransactionGroupedByCategory(fromDate: Date) {
    return this.transactionsRepository.aggregate<{
      category: string;
      amount: number;
    }>([
      {
        $match: {
          date: {
            $gt: fromDate,
          },
        },
      },
      {
        $group: {
          _id: '$category',
          amount: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          amount: '$amount',
        },
      },
    ]);
  }

  async categorizeTransaction(transactionId: string, category: string) {
    return this.transactionsRepository.updateOne(
      { id: transactionId },
      { category }
    );
  }

  async upsertTransactions(transactions: Transaction[]) {
    const bulkOperation =
      this.transactionsRepository.collection.initializeUnorderedBulkOp();
    transactions.forEach((transaction) => {
      const {
        id,
        category: _category,
        reconciled: _reconciled,
        ...rest
      } = transaction;
      bulkOperation
        .find({ id: id, reconciled: false })
        .upsert()
        .updateOne({
          $set: { ...rest },
          $setOnInsert: {
            category: '',
            reconciled: false,
          },
        });
    });
    const result = await bulkOperation.execute();
    return result;
  }
}
