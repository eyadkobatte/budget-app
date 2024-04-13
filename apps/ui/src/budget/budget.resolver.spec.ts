import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { budgetResolver } from './budget.resolver';

describe('transactionsResolver', () => {
  const executeResolver: ResolveFn<unknown> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => budgetResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
