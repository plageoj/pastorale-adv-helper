import { Injectable, NgModule } from '@angular/core';
import { AuthGuard, customClaims } from '@angular/fire/auth-guard';
import { Title } from '@angular/platform-browser';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
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
    path: 'settings',
    canActivate: [AuthGuard],
    data: { authGuardPipe: isAdmin },
    loadChildren: () =>
      import('./components/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./components/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
];

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} - 協賛広告ヘルパー`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class AppRoutingModule {}
