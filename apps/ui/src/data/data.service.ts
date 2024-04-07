import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryGroup } from '@entities/category';
import { Requisition } from '@entities/requisition';
import { Transaction } from '@entities/transaction';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public categoryGroups$ = new BehaviorSubject<CategoryGroup[]>([]);
  constructor(private http: HttpClient) {}

  getRequisitions(): Observable<Requisition[]> {
    return this.http
      .get<Requisition[]>('http://localhost:3000/api/v1/requisitions')
      .pipe(
        map((requisitions) =>
          requisitions.map((requisition) => ({
            ...requisition,
            created: DateTime.fromISO(requisition.created as any).toJSDate(),
          }))
        )
      );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      'http://localhost:3000/api/v1/transactions',
      {
        params: {
          fromDate: '2024-01-01T00:00:00.000Z',
        },
      }
    );
  }

  getCategories(): Observable<CategoryGroup[]> {
    return this.http
      .get<CategoryGroup[]>('http://localhost:3000/api/v1/categories')
      .pipe(tap((categoryGroups) => this.categoryGroups$.next(categoryGroups)));
  }
}
