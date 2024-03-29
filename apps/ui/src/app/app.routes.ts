import { Route } from '@angular/router';
import { BankConnectComponent } from '../bank-connect/bank-connect.component';

export const appRoutes: Route[] = [
  {
    path: 'connect',
    component: BankConnectComponent,
  },
];
