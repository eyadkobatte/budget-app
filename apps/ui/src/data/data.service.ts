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

  public startDate$: BehaviorSubject<Date>;

  baseUrl =
    'http://budget-server-env-1.eba-zmpq3rah.eu-west-2.elasticbeanstalk.com';

  constructor(private http: HttpClient) {
    const startOfMonth = DateTime.now().startOf('month');
    this.startDate$ = new BehaviorSubject(startOfMonth.toJSDate());
  }

  getRequisitions(): Observable<Requisition[]> {
    return this.http
      .get<Requisition[]>(`${this.baseUrl}/api/v1/requisitions`)
      .pipe(
        map((requisitions) =>
          requisitions.map((requisition) => ({
            ...requisition,
            created: DateTime.fromISO(requisition.created as any).toJSDate(),
          }))
        )
      );
  }

  getTransactions(fromDate: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/api/v1/transactions`, {
      params: {
        fromDate: fromDate.toISOString(),
      },
    });
  }

  getCategories(): Observable<CategoryGroup[]> {
    return this.http
      .get<CategoryGroup[]>(`${this.baseUrl}/api/v1/categories`)
      .pipe(
        tap((categoryGroups) => {
          this.categoryGroups$.next(categoryGroups);
        })
      );
  }

  getBudgetOverview(fromDate: Date) {
    return this.http.get(`${this.baseUrl}/api/v1/budget/overview`, {
      params: {
        fromDate: fromDate.toISOString(),
      },
    });
  }

  categorizeTransaction(transactionId: string, category: string) {
    return this.http.put(
      `http://localhost:3000/api/v1/transactions/categorize/`,
      {
        transactionId,
        category,
      }
    );
  }
}
