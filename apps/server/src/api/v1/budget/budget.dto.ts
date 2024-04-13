import { IsDateString } from 'class-validator';

export class GetOverviewDto {
  @IsDateString()
  fromDate: string;
}
