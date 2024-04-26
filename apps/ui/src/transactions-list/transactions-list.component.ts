import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@entities/transaction';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { CategoryGroup } from '@entities/category';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
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
        this.categoryGroupsForAutocomplete = [
          {
            label: 'Transfers',
            items: [{ label: 'Mark as Transfer', value: 'Mark as Transfer' }],
          } as SelectItemGroup,
        ].concat(
          ...this.categoryGroups.map(
            (categoryGroup) =>
              ({
                label: categoryGroup.name,
                items: categoryGroup.categories.map((category) => ({
                  label: category.name,
                  value: category.name,
                })),
              } as SelectItemGroup)
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  findTransactionPair(transactionId: string) {
    const otherTransactionId = this.transactions.find(
      (transaction) => transaction.id === transactionId
    );
    return otherTransactionId;
  }

  categorySelected(_id: string, category: string) {
    if (category === 'Mark as Transfer') {
      this.findTransactionPair(_id);
    } else {
      this.dataService
        .categorizeTransaction(_id, category)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (value) => {
            console.log(value);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  syncAccounts() {
    this.dataService
      .syncAccounts()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((value) => {
          console.log(value);
          return this.dataService.getTransactions(
            this.dataService.startDate$.value
          );
        })
      )
      .subscribe({
        next: (value) => {
          this.transactions = value;
        },
      });
  }
}
