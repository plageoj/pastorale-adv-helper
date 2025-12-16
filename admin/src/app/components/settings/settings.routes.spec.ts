import { SETTINGS_ROUTES } from './settings.routes';

describe('SETTINGS_ROUTES', () => {
  it('should have single root route', () => {
    expect(SETTINGS_ROUTES.length).toBe(1);
    expect(SETTINGS_ROUTES[0].path).toBe('');
  });

  it('should have lazy loaded component', () => {
    expect(SETTINGS_ROUTES[0].loadComponent).toBeDefined();
    expect(typeof SETTINGS_ROUTES[0].loadComponent).toBe('function');
  });

  it('should have correct title', () => {
    expect(SETTINGS_ROUTES[0].title).toBe('設定');
  });
});
