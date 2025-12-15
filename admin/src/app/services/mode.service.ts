import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
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
  private readonly inj = inject(Injector);
  private readonly fn = inject(Functions);

  constructor() {
    isSupported().then((supported: any) => {
      if (supported) {
        this.config = this.inj.get(RemoteConfig);

        this.config.settings.minimumFetchIntervalMillis = 3600000;
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

  setMode(mode: Mode) {
    return httpsCallable<{ mode: Mode }>(
      this.fn,
      'setMode'.toLowerCase()
    )({ mode });
  }
}
