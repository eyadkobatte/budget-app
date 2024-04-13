import { Controller, Get, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { GetOverviewDto } from './budget.dto';

@Controller('api/v1/budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('/overview')
  getOverview(@Query() getOverviewDto: GetOverviewDto) {
    return this.budgetService.getOverviewBudget(getOverviewDto.fromDate);
  }
}
