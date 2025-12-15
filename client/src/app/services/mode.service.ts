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

  constructor(private readonly inj: Injector) {
    isSupported().then((supported: any) => {
      if (supported) {
        this.config = inj.get(RemoteConfig);

        this.config.settings.minimumFetchIntervalMillis = 60 * 1000;
        runInInjectionContext(this.inj, () => fetchAndActivate(this.config!));
      }
    });
  }

  getMode(): Observable<Mode> {
    if (!this.config) return of('contract');
    return runInInjectionContext(this.inj, () =>
      getStringChanges(this.config!, 'mode')
    ) as Observable<Mode>;
  }
}
