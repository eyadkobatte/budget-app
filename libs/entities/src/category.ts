class Category {
  name!: string;
  assigned!: number;
  left?: number;
  spent?: number;
}

export class CategoryGroup {
  name!: string;
  categories!: Category[];
}
