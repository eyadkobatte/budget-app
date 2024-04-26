import { IsISO8601, IsString } from 'class-validator';

export class GetTransactionsDto {
  @IsISO8601({ strict: true })
  fromDate: string;
}

export class CategorizeTransactionDto {
  @IsString()
  _id: string;

  @IsString()
  category: string;
}
