import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CategorizeTransactionDto,
  GetTransactionsDto,
} from './transactions.dto';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions(@Query() getTransactionsDto: GetTransactionsDto) {
    return this.transactionsService.getTransactions(
      getTransactionsDto.fromDate
    );
  }

  @Put('/categorize')
  categorizeTransaction(
    @Body() categorizeTransactionsDto: CategorizeTransactionDto
  ) {
    return this.transactionsService.categorizeTransaction(
      categorizeTransactionsDto.transactionId,
      categorizeTransactionsDto.category
    );
  }
}
