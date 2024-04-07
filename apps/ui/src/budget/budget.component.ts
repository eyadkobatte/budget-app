import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryGroup } from '@entities/category';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';

type CategoryGroupRender = CategoryGroup & {
  total: number;
};

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  categories: CategoryGroupRender[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        const categoryGroups: CategoryGroup[] = data['categories'];
        this.categories = categoryGroups.map((categoryGroup) => {
          return {
            name: categoryGroup.name,
            categories: categoryGroup.categories,
            total: categoryGroup.categories.reduce(
              (acc, curr) => acc + curr.assigned,
              0
            ),
          } as CategoryGroupRender;
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
