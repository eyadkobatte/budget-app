import { IsISO8601, IsString } from 'class-validator';

export class GetTransactionsDto {
  @IsISO8601({ strict: true })
  fromDate: string;
}

export class CategorizeTransactionDto {
  @IsString()
  transactionId: string;

  @IsString()
  category: string;
}
