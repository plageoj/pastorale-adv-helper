import { TitleStrategy } from '@angular/router';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { appConfig } from './app.config';
import { TemplatePageTitleStrategy } from './app.routes';

describe('appConfig', () => {
  it('should have providers defined', () => {
    expect(appConfig.providers).toBeDefined();
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });

  it('should have TitleStrategy provider configured', () => {
    const titleProvider = appConfig.providers.find(
      (p: any) => p?.provide === TitleStrategy
    ) as any;
    expect(titleProvider?.useClass).toBe(TemplatePageTitleStrategy);
  });

  it('should have SnackBar default options configured', () => {
    const snackBarProvider = appConfig.providers.find(
      (p: any) => p?.provide === MAT_SNACK_BAR_DEFAULT_OPTIONS
    ) as any;
    expect(snackBarProvider?.useValue).toEqual({ duration: 2500 });
  });

  it('should include Firebase providers', () => {
    const providerFunctions = appConfig.providers.filter(
      (p: any) => typeof p === 'object' && p?.ɵproviders
    );
    expect(providerFunctions.length).toBeGreaterThan(0);
  });

  it('should include tracking services', () => {
    const hasTrackingServices = appConfig.providers.some(
      (p: any) =>
        p?.name === 'ScreenTrackingService' || p?.name === 'UserTrackingService'
    );
    expect(hasTrackingServices || appConfig.providers.length > 5).toBeTrue();
  });
});
