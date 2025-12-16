import { STORES_ROUTES } from './stores.routes';

describe('STORES_ROUTES', () => {
  it('should have three routes', () => {
    expect(STORES_ROUTES.length).toBe(3);
    expect(STORES_ROUTES.map((r) => r.path)).toEqual(['', ':id', ':id/history']);
  });

  it('should have lazy loaded components for all routes', () => {
    STORES_ROUTES.forEach((route) => {
      expect(route.loadComponent).toBeDefined();
      expect(typeof route.loadComponent).toBe('function');
    });
  });

  describe('root route', () => {
    const rootRoute = STORES_ROUTES.find((r) => r.path === '');

    it('should have correct title', () => {
      expect(rootRoute?.title).toBe('広告先');
    });
  });

  describe('detail route', () => {
    const detailRoute = STORES_ROUTES.find((r) => r.path === ':id');

    it('should use id parameter', () => {
      expect(detailRoute?.path).toContain(':id');
    });
  });

  describe('history route', () => {
    const historyRoute = STORES_ROUTES.find((r) => r.path === ':id/history');

    it('should use id parameter with history suffix', () => {
      expect(historyRoute?.path).toBe(':id/history');
    });
  });
});
