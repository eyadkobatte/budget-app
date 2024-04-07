class Category {
  name!: string;
  assigned!: number;
}

export class CategoryGroup {
  name!: string;
  categories!: Category[];
}
