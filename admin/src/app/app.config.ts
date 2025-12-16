import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { APP_ROUTES, TemplatePageTitleStrategy } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideAnimations(),
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 },
    },
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => {
      const auth = getAuth();
      environment.useEmulator &&
        connectAuthEmulator(auth, environment.emulator.authUrl);
      return auth;
    }),
    provideFirestore(() => {
      const fire = getFirestore();
      environment.useEmulator &&
        connectFirestoreEmulator(
          fire,
          environment.emulator.firestore.host,
          environment.emulator.firestore.port
        );
      return fire;
    }),
    provideFunctions(() => {
      const func = getFunctions();
      environment.useEmulator &&
        connectFunctionsEmulator(
          func,
          environment.emulator.functions.host,
          environment.emulator.functions.port
        );
      return func;
    }),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
};
