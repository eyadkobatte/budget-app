import { Module } from '@nestjs/common';
import { RequisitionsModule } from './requisitions/requisitions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [CategoriesModule, RequisitionsModule, TransactionsModule],
})
export class ApiV1Module {}
