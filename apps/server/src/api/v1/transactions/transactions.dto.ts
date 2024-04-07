import { IsISO8601 } from 'class-validator';

export class GetTransactionsDto {
  @IsISO8601({ strict: true })
  fromDate: string;
}
