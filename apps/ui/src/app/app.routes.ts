import { Route } from '@angular/router';
import { BankConnectComponent } from '../bank-connect/bank-connect.component';
import { BudgetComponent } from '../budget/budget.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { requisitionsResolver } from '../accounts/requisitions.resolver';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';
import { transactionsResolver } from '../transactions-list/transactions.resolver';
import { categoriesResolver } from '../budget/categories.resolver';
import { budgetResolver } from '../budget/budget.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'budget',
  },
  {
    path: 'budget',
    component: BudgetComponent,
    resolve: {
      budget: budgetResolver,
      categories: categoriesResolver,
    },
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    resolve: {
      requisitions: requisitionsResolver,
    },
  },
  {
    path: 'transactions',
    component: TransactionsListComponent,
    resolve: {
      transactions: transactionsResolver,
    },
  },
  {
    path: 'connect',
    component: BankConnectComponent,
  },
];
