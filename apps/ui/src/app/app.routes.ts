import { Route } from '@angular/router';
import { BankConnectComponent } from '../bank-connect/bank-connect.component';
import { BudgetComponent } from '../budget/budget.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { requisitionsResolver } from '../accounts/requisitions.resolver';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';
import { transactionsResolver } from '../transactions-list/transactions.resolver';
import { categoriesResolver } from '../budget/categories.resolver';
import { budgetResolver } from '../budget/budget.resolver';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { HomeComponent } from '../home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo('home/budget') },
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('/') },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/budget',
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
    ],
  },
];
