import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../data/data.service';
import { Transaction } from '@entities/transaction';

export const transactionsResolver: ResolveFn<Transaction[]> = () => {
  const dataService = inject(DataService);
  return dataService.getTransactions();
};
