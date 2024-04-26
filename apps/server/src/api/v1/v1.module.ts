import { Module } from '@nestjs/common';
import { RequisitionsModule } from './requisitions/requisitions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetModule } from './budget/budget.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    AccountsModule,
    BudgetModule,
    CategoriesModule,
    RequisitionsModule,
    TransactionsModule,
  ],
})
export class ApiV1Module {}
