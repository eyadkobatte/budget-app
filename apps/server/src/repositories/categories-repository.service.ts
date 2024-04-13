import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryGroup } from '@entities/category';

@Injectable()
export class CategoriesRepositoryService {
  constructor(
    @InjectModel(CategoryGroup.name)
    private categoryGroupModel: Model<CategoryGroup>
  ) {}

  async getCategoriesForBudget() {
    return this.categoryGroupModel.aggregate([
      {
        $unwind: {
          path: '$categories',
        },
      },
      {
        $project: {
          name: 'name',
          category: {
            $concat: ['$name', '::', '$categories.name'],
          },
          budget: '$categories.assigned',
          categories: -1,
        },
      },
    ]);
  }

  async getAllCategories() {
    return this.categoryGroupModel.find().lean();
  }

  async createCategory(
    category: CategoryGroup['categories'][number],
    categoryGroupName: string
  ) {
    return this.categoryGroupModel.updateOne(
      { name: categoryGroupName },
      { $push: { categories: category } },
      { upsert: true }
    );
  }
}
