import { Routes } from '@angular/router';

export const MEMBER_ROUTES: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
];
