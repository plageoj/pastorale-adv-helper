import { STORES_ROUTES } from './stores.routes';

describe('STORES_ROUTES', () => {
  it('should have store routes with lazy loading', () => {
    expect(STORES_ROUTES.length).toBe(3);
    expect(STORES_ROUTES.map((r) => r.path)).toEqual(['', ':id', ':id/history']);
    STORES_ROUTES.forEach((route) => {
      expect(route.loadComponent).toBeDefined();
    });
  });
});
