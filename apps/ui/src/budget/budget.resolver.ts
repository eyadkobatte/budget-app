import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../data/data.service';

export const budgetResolver: ResolveFn<unknown> = () => {
  const dataService = inject(DataService);
  const startOfMonth = dataService.startDate$.value;
  return dataService.getBudgetOverview(startOfMonth);
};
