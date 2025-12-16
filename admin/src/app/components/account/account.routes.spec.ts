import { ACCOUNT_ROUTES } from './account.routes';

describe('ACCOUNT_ROUTES', () => {
  it('should have login and unauthorized routes with correct configuration', () => {
    expect(ACCOUNT_ROUTES.length).toBe(2);
    expect(ACCOUNT_ROUTES.map((r) => r.path)).toEqual(['login', 'unauthorized']);
    ACCOUNT_ROUTES.forEach((route) => {
      expect(route.loadComponent).toBeDefined();
      expect(route.canActivate).toBeDefined();
      expect(route.data?.authGuardPipe).toBeDefined();
    });
  });
});
