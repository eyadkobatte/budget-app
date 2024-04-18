import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@entities/transaction';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { CategoryGroup } from '@entities/category';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { TableModule } from 'primeng/table';
import { SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, TableModule],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  categoryGroups: CategoryGroup[] = [];
  categoryGroupsForAutocomplete: SelectItemGroup[] = [];

  transactions: Transaction[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.transactions = data['transactions'];
      },
    });
  }

  ngOnInit(): void {
    this.dataService.getCategories().pipe(takeUntil(this.destroy$)).subscribe();
    this.dataService.categoryGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((categoryGroups) => {
        this.categoryGroups = categoryGroups;
        this.categoryGroupsForAutocomplete = this.categoryGroups.map(
          (categoryGroup) =>
            ({
              label: categoryGroup.name,
              items: categoryGroup.categories.map((category) => ({
                label: category.name,
                value: category.name,
              })),
            } as SelectItemGroup)
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  categorySelected(transactionId: string, category: string) {
    this.dataService.categorizeTransaction(transactionId, category).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
