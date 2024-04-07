import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../data/data.service';
import { CategoryGroup } from '@entities/category';

export const categoriesResolver: ResolveFn<CategoryGroup[]> = () => {
  const dataService = inject(DataService);
  return dataService.getCategories();
};
