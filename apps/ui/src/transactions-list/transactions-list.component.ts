import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@entities/transaction';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { CategoryGroup } from '@entities/category';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  categoryGroups: CategoryGroup[] = [];
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
    this.dataService.categoryGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((categoryGroups) => {
        this.categoryGroups = categoryGroups;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
