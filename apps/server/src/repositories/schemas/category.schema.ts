import mongoose from 'mongoose';
import { CategoryGroup } from '@entities/category';

export const CategoryGroupSchema = new mongoose.Schema<CategoryGroup>(
  {
    name: String,
    categories: [
      {
        name: String,
        assigned: Number,
      },
      {
        _id: false,
      },
    ],
  },
  {
    versionKey: false,
  }
);
