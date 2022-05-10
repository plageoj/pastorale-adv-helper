import { NgModule } from '@angular/core';
import { AuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo('/') },
    component: LoginComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
