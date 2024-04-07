import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { transactionsResolver } from './transactions.resolver';
import { Transaction } from '@entities/transaction';

describe('transactionsResolver', () => {
  const executeResolver: ResolveFn<Transaction[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      transactionsResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
