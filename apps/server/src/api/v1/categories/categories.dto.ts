import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  groupName: string;

  @IsString()
  categoryName: string;

  @IsNumber()
  assigned: number;
}
