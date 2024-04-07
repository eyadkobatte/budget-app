import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Requisition } from '@entities/requisition';
import { DateAddMinusPipe } from '../shared/pipes/date-add-minus.pipe';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, DateAddMinusPipe],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  requisitions: Requisition[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.requisitions = data['requisitions'];
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
