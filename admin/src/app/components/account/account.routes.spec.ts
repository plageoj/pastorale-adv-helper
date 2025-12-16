import { ACCOUNT_ROUTES } from './account.routes';

describe('ACCOUNT_ROUTES', () => {
  it('should have login and unauthorized routes', () => {
    expect(ACCOUNT_ROUTES.length).toBe(2);
    expect(ACCOUNT_ROUTES.map((r) => r.path)).toEqual(['login', 'unauthorized']);
  });

  it('should have lazy loaded components for all routes', () => {
    ACCOUNT_ROUTES.forEach((route) => {
      expect(route.loadComponent).toBeDefined();
    });
  });

  it('should have AuthGuard on all routes', () => {
    ACCOUNT_ROUTES.forEach((route) => {
      expect(route.canActivate).toBeDefined();
      expect(route.data?.authGuardPipe).toBeDefined();
    });
  });

  describe('login route', () => {
    const loginRoute = ACCOUNT_ROUTES.find((r) => r.path === 'login');

    it('should have correct title', () => {
      expect(loginRoute?.title).toBe('ログイン');
    });

    it('should have authGuardPipe that redirects logged in users', () => {
      expect(loginRoute?.data?.authGuardPipe).toBeDefined();
      expect(typeof loginRoute?.data?.authGuardPipe).toBe('function');
    });
  });

  describe('unauthorized route', () => {
    const unauthorizedRoute = ACCOUNT_ROUTES.find(
      (r) => r.path === 'unauthorized'
    );

    it('should have correct title', () => {
      expect(unauthorizedRoute?.title).toBe('権限がありません');
    });

    it('should have authGuardPipe that redirects unauthorized users', () => {
      expect(unauthorizedRoute?.data?.authGuardPipe).toBeDefined();
      expect(typeof unauthorizedRoute?.data?.authGuardPipe).toBe('function');
    });
  });
});
