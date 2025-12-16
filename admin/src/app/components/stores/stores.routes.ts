import { Routes } from '@angular/router';

export const STORES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./stores.component').then((m) => m.StoresComponent),
    title: '広告先',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./assign-member/assign-member.component').then(
        (m) => m.AssignMemberComponent
      ),
  },
  {
    path: ':id/history',
    loadComponent: () =>
      import('./history/history.component').then((m) => m.HistoryComponent),
  },
];
