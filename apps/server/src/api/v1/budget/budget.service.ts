import { Injectable } from '@nestjs/common';
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
          return { ...category, left: category.assigned };
        }
        const amountLeft = category.assigned + selectedGroup.amount;
        return {
          ...category,
          left: amountLeft,
        };
      });
      return {
        ...categoryGroup,
        categories,
      };
    });
  }
}
