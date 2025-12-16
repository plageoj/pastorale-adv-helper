import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import {
  APP_ROUTES,
  isAdmin,
  mapClaimsToAccess,
  TemplatePageTitleStrategy,
} from './app.routes';

describe('app.routes', () => {
  describe('APP_ROUTES', () => {
    it('should have correct route paths', () => {
      const paths = APP_ROUTES.map((r) => r.path);
      expect(paths).toEqual(['', 'members', 'stores', 'settings', 'account']);
    });

    it('should redirect root to /members', () => {
      const rootRoute = APP_ROUTES.find((r) => r.path === '');
      expect(rootRoute?.redirectTo).toBe('/members');
      expect(rootRoute?.pathMatch).toBe('full');
    });

    it('should have AuthGuard on protected routes', () => {
      const protectedPaths = ['members', 'stores', 'settings'];
      protectedPaths.forEach((path) => {
        const route = APP_ROUTES.find((r) => r.path === path);
        expect(route?.canActivate).toBeTruthy();
        expect(route?.data?.authGuardPipe).toBeDefined();
      });
    });

    it('should not have AuthGuard on account route', () => {
      const accountRoute = APP_ROUTES.find((r) => r.path === 'account');
      expect(accountRoute?.canActivate).toBeUndefined();
    });
  });

  describe('TemplatePageTitleStrategy', () => {
    let strategy: TemplatePageTitleStrategy;
    let titleService: Title;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TemplatePageTitleStrategy, Title],
      });
      strategy = TestBed.inject(TemplatePageTitleStrategy);
      titleService = TestBed.inject(Title);
    });

    it('should set title with suffix when title is defined', () => {
      const setTitleSpy = spyOn(titleService, 'setTitle');
      spyOn(strategy, 'buildTitle').and.returnValue('テストページ');

      strategy.updateTitle({} as RouterStateSnapshot);

      expect(setTitleSpy).toHaveBeenCalledWith('テストページ - 協賛広告ヘルパー');
    });

    it('should not set title when buildTitle returns undefined', () => {
      const setTitleSpy = spyOn(titleService, 'setTitle');
      spyOn(strategy, 'buildTitle').and.returnValue(undefined);

      strategy.updateTitle({} as RouterStateSnapshot);

      expect(setTitleSpy).not.toHaveBeenCalled();
    });
  });

  describe('mapClaimsToAccess', () => {
    it('should redirect to login when claims is null', () => {
      expect(mapClaimsToAccess(null)).toEqual(['account', 'login']);
    });

    it('should redirect to unauthorized when admin is false', () => {
      expect(mapClaimsToAccess({ admin: false })).toEqual([
        'account',
        'unauthorized',
      ]);
    });

    it('should redirect to unauthorized when admin claim is missing', () => {
      expect(mapClaimsToAccess({})).toEqual(['account', 'unauthorized']);
    });

    it('should allow access when admin is true', () => {
      expect(mapClaimsToAccess({ admin: true })).toBe(true);
    });
  });

  describe('isAdmin', () => {
    it('should return function that creates a pipe', () => {
      const guardPipe = isAdmin();
      expect(typeof guardPipe).toBe('function');
    });
  });
});
