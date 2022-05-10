import { NgModule } from '@angular/core';
import { AuthGuard, customClaims } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const isAdmin = () =>
  pipe(
    customClaims,
    map((claims?: { admin: boolean }) => {
      if (!claims) return ['account', 'login'];
      if (!claims.admin) return ['account', 'unauthorized'];
      return true;
    })
  );

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  {
    path: 'members',
    canActivate: [AuthGuard],
    data: { authGuardPipe: isAdmin },
    loadChildren: () =>
      import('./components/members/members.module').then(
        (m) => m.MembersModule
      ),
  },
  {
    path: 'stores',
    canActivate: [AuthGuard],
    data: { authGuardPipe: isAdmin },
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
