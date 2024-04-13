import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@entities/transaction';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { CategoryGroup } from '@entities/category';
import {
  AutocompleteComponent,
  AutocompleteInput,
  AutocompleteOutput,
} from '../components/autocomplete/autocomplete.component';

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
  categoryGroupsForAutocomplete: AutocompleteInput = [];
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
              name: categoryGroup.name,
              options: categoryGroup.categories.map(
                (category) => category.name
              ),
            } as AutocompleteInput[number])
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  categorySelected(transactionId: string, option: AutocompleteOutput) {
    this.dataService
      .categorizeTransaction(transactionId, option.option)
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
