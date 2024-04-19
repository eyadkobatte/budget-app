import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CategorizeTransactionDto,
  GetTransactionsDto,
} from './transactions.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/transactions')
@UseGuards(AuthGuard('jwt'))
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
