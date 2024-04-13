class Category {
  name!: string;
  assigned!: number;
  left?: number;
}

export class CategoryGroup {
  name!: string;
  categories!: Category[];
}
