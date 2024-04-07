import { Module } from '@nestjs/common';
import { TransactionsRepositoryService } from './transactions-repository.service';
import { Transaction } from '@entities/transaction';
import { TransactionSchema } from './schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Requisition } from '@entities/requisition';
import { RequisitionSchema } from './schemas/requisition.schema';
import { RequisitionsRepositoryService } from './requisitions-repository.service';
import { CategoryGroupSchema } from './schemas/category.schema';
import { CategoryGroup } from '@entities/category';
import { CategoriesRepositoryService } from './categories-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Requisition.name, schema: RequisitionSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: CategoryGroup.name, schema: CategoryGroupSchema },
    ]),
  ],
  providers: [
    RequisitionsRepositoryService,
    TransactionsRepositoryService,
    CategoriesRepositoryService,
  ],
  exports: [
    RequisitionsRepositoryService,
    TransactionsRepositoryService,
    CategoriesRepositoryService,
  ],
})
export class RepositoriesModule {}
