import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../data/data.service';
import { Requisition } from '@entities/requisition';

export const requisitionsResolver: ResolveFn<Requisition[]> = () => {
  const dataService = inject(DataService);
  return dataService.getRequisitions();
};
