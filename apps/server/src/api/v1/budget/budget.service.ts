import { Injectable } from '@nestjs/common';
import currency from 'currency.js';

import { CategoriesRepositoryService } from '../../../repositories/categories-repository.service';
import { TransactionsRepositoryService } from '../../../repositories/transactions-repository.service';

@Injectable()
export class BudgetService {
  constructor(
    private categoriesRepositoryService: CategoriesRepositoryService,
    private transactionsRepositoryService: TransactionsRepositoryService
  ) {}

  async getOverviewBudget(fromDate: string) {
    const categoryGroups =
      await this.categoriesRepositoryService.getAllCategories();
    const categorizedTransactions =
      await this.transactionsRepositoryService.getTransactionGroupedByCategory(
        new Date(fromDate)
      );
    return categoryGroups.map((categoryGroup) => {
      const categories = categoryGroup.categories.map((category) => {
        const selectedGroup = categorizedTransactions.find(
          (group) => group.category === category.name
        );
        if (!selectedGroup) {
          return { ...category, spent: 0, left: category.assigned };
        }
        const amountLeft = currency(category.assigned).add(
          selectedGroup.amount
        );

        return {
          ...category,
          spent: Math.abs(selectedGroup.amount),
          left: amountLeft.value,
        };
      });
      const assigned = categories.reduce(
        (acc, curr) => currency(acc).add(curr.assigned).value,
        0
      );
      const spent = Math.abs(
        categories.reduce((acc, curr) => currency(acc).add(curr.spent).value, 0)
      );
      const left = categories.reduce(
        (acc, curr) => currency(acc).add(curr.left).value,
        0
      );

      return {
        ...categoryGroup,
        categories,
        assigned,
        spent,
        left,
      };
    });
  }
}
