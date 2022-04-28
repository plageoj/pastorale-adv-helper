import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { LoginComponent } from './components/member/login/login.component';
import { ListComponent } from './components/store/list/list.component';
import { DetailComponent } from './components/store/detail/detail.component';
import { RegisterComponent } from './components/member/register/register.component';
import { ReportComponent } from './components/store/report/report.component';

const loggedIn = () => redirectUnauthorizedTo('/login');

const routes: Routes = [
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
        children: [
          {
            path: '',
            component: ListComponent,
          },
          {
            path: ':id',
            component: DetailComponent,
          },
          {
            path: ':id/report',
            component: ReportComponent,
          },
        ],
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo('/') },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
