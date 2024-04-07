import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { requisitionsResolver } from './requisitions.resolver';
import { Requisition } from '@entities/requisition';

describe('requisitionsResolver', () => {
  const executeResolver: ResolveFn<Requisition[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      requisitionsResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
