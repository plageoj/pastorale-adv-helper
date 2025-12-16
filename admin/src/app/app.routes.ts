import { Injectable } from '@angular/core';
import { AuthGuard, customClaims } from '@angular/fire/auth-guard';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const isAdmin = () =>
  pipe(
    customClaims,
    map((claims) => {
      if (!claims) return ['account', 'login'];
      if (!(claims as { admin: boolean }).admin)
        return ['account', 'unauthorized'];
      return true;
    })
  );

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  {
    path: 'members',
    canActivate: [AuthGuard],
    data: { authGuardPipe: isAdmin },
    loadChildren: () =>
      import('./components/members/members.routes').then(
        (m) => m.MEMBERS_ROUTES
      ),
  },
  {
    path: 'stores',
    canActivate: [AuthGuard],
    data: { authGuardPipe: isAdmin },
    loadChildren: () =>
      import('./components/stores/stores.routes').then((m) => m.STORES_ROUTES),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    data: { authGuardPipe: isAdmin },
    loadChildren: () =>
      import('./components/settings/settings.routes').then(
        (m) => m.SETTINGS_ROUTES
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./components/account/account.routes').then(
        (m) => m.ACCOUNT_ROUTES
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
