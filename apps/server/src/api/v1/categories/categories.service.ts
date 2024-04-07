import { Injectable } from '@nestjs/common';
import { CategoriesRepositoryService } from '../../../repositories/categories-repository.service';
import { CategoryGroup } from '@entities/category';

@Injectable()
export class CategoriesService {
  constructor(
    private categoriesRepositoryService: CategoriesRepositoryService
  ) {}

  getAllCategories() {
    return this.categoriesRepositoryService.getAllCategories();
  }

  createCategory(
    category: CategoryGroup['categories'][number],
    categoryGroup: string
  ) {
    return this.categoriesRepositoryService.createCategory(
      category,
      categoryGroup
    );
  }
}
