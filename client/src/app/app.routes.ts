import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const loggedIn = () => redirectUnauthorizedTo('/login');

export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { authGuardPipe: loggedIn },
    children: [
      {
        path: '',
        redirectTo: 'stores',
        pathMatch: 'full',
      },
      {
        path: 'stores',
        loadChildren: () =>
          import('./components/store/store.routes').then((m) => m.STORE_ROUTES),
      },
      {
        path: 'member',
        loadChildren: () =>
          import('./components/member/member.routes').then(
            (m) => m.MEMBER_ROUTES
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.routes').then((m) => m.LOGIN_ROUTES),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo('/') },
  },
];
