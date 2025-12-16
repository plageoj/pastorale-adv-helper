import { MEMBERS_ROUTES } from './members.routes';

describe('MEMBERS_ROUTES', () => {
  it('should have single root route', () => {
    expect(MEMBERS_ROUTES.length).toBe(1);
    expect(MEMBERS_ROUTES[0].path).toBe('');
  });

  it('should have lazy loaded component', () => {
    expect(MEMBERS_ROUTES[0].loadComponent).toBeDefined();
    expect(typeof MEMBERS_ROUTES[0].loadComponent).toBe('function');
  });

  it('should have correct title', () => {
    expect(MEMBERS_ROUTES[0].title).toBe('団員');
  });
});
