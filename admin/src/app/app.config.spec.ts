import { TitleStrategy } from '@angular/router';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { appConfig } from './app.config';
import { TemplatePageTitleStrategy } from './app.routes';

describe('appConfig', () => {
  it('should have providers with TitleStrategy and SnackBar config', () => {
    expect(appConfig.providers).toBeDefined();

    const titleProvider = appConfig.providers.find(
      (p: any) => p?.provide === TitleStrategy
    ) as any;
    expect(titleProvider?.useClass).toBe(TemplatePageTitleStrategy);

    const snackBarProvider = appConfig.providers.find(
      (p: any) => p?.provide === MAT_SNACK_BAR_DEFAULT_OPTIONS
    ) as any;
    expect(snackBarProvider?.useValue).toEqual({ duration: 2500 });
  });
});
