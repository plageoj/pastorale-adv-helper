import { MEMBERS_ROUTES } from './members.routes';

describe('MEMBERS_ROUTES', () => {
  it('should have root route with lazy loading', () => {
    expect(MEMBERS_ROUTES.length).toBe(1);
    expect(MEMBERS_ROUTES[0].path).toBe('');
    expect(MEMBERS_ROUTES[0].loadComponent).toBeDefined();
  });
});
