import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetTransactionsDto } from './transactions.dto';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions(@Query() getTransactionsDto: GetTransactionsDto) {
    return this.transactionsService.getTransactions(
      getTransactionsDto.fromDate
    );
  }
}
