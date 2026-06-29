import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./presentation/views/auth/login/login.component').then(m => m.LoginComponent) },
  { path: '', loadComponent: () => import('./presentation/views/cash-flow/cash-flow.component').then(m => m.CashFlowComponent) }
];
