import { SETTINGS_ROUTES } from './settings.routes';

describe('SETTINGS_ROUTES', () => {
  it('should have root route with lazy loading', () => {
    expect(SETTINGS_ROUTES.length).toBe(1);
    expect(SETTINGS_ROUTES[0].path).toBe('');
    expect(SETTINGS_ROUTES[0].loadComponent).toBeDefined();
  });
});
