import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { RepositoriesModule } from '../../../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
