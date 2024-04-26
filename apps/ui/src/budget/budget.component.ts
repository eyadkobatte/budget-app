import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryGroup } from '@entities/category';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

type CategoryGroupRender = CategoryGroup & {
  total: number;
  spent: number;
  left: number;
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
        const categoryGroups: (CategoryGroup & {
          assigned: number;
          spent: number;
          left: number;
        })[] = data['budget'];
        this.categories = categoryGroups.map((categoryGroup) => {
          return {
            name: categoryGroup.name,
            categories: categoryGroup.categories,
            total: categoryGroup.assigned,
            spent: categoryGroup.spent,
            left: categoryGroup.left,
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
