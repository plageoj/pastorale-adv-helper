import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const loggedIn = () => redirectUnauthorizedTo('/account/login');

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  {
    path: 'members',
    canActivate: [AuthGuard],
    data: { authGuardPipe: loggedIn },
    loadChildren: () =>
      import('./components/members/members.module').then(
        (m) => m.MembersModule
      ),
  },
  {
    path: 'stores',
    canActivate: [AuthGuard],
    data: { authGuardPipe: loggedIn },
    loadChildren: () =>
      import('./components/stores/stores.module').then((m) => m.StoresModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./components/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
