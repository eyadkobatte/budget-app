import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { GetOverviewDto } from './budget.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/budget')
@UseGuards(AuthGuard('jwt'))
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('/overview')
  getOverview(@Query() getOverviewDto: GetOverviewDto) {
    return this.budgetService.getOverviewBudget(getOverviewDto.fromDate);
  }
}
