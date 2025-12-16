import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import {
  fetchAndActivate,
  getStringChanges,
  isSupported,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { Observable, of } from 'rxjs';

export type Mode = 'contract' | 'receipt';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private config?: RemoteConfig;
  private configInitialized = false;
  private initPromise?: Promise<void>;

  constructor(private readonly inj: Injector) {}

  private initializeConfig(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = isSupported().then((supported) => {
      if (supported) {
        this.config = this.inj.get(RemoteConfig);
        this.config.settings.minimumFetchIntervalMillis = 60 * 1000;
        runInInjectionContext(this.inj, () => fetchAndActivate(this.config!));
      }
      this.configInitialized = true;
    });

    return this.initPromise;
  }

  getMode(): Observable<Mode> {
    if (!this.configInitialized) {
      this.initializeConfig();
    }
    if (!this.config) return of('contract');
    return runInInjectionContext(this.inj, () =>
      getStringChanges(this.config!, 'mode')
    ) as Observable<Mode>;
  }
}
