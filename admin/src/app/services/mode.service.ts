import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  fetchAndActivate,
  getStringChanges,
  isSupported,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { map, Observable, of } from 'rxjs';

export type Mode = 'contract' | 'receipt';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private config?: RemoteConfig;
  private readonly inj = inject(Injector);
  private readonly fn = inject(Functions);

  constructor() {
    this.initializeConfig();
  }

  private initializeConfig(): void {
    isSupported().then((supported) => {
      if (!supported) return;

      this.config = this.inj.get(RemoteConfig);
      this.config.settings.minimumFetchIntervalMillis = 3600000;
      runInInjectionContext(this.inj, () => fetchAndActivate(this.config!));
    });
  }

  getMode(): Observable<Mode> {
    if (!this.config) return of('contract');
    return runInInjectionContext(this.inj, () =>
      getStringChanges(this.config!, 'mode').pipe(
        map((mode) => (mode === 'receipt' ? 'receipt' : 'contract'))
      )
    );
  }

  setMode(mode: Mode) {
    return httpsCallable<{ mode: Mode }>(
      this.fn,
      'setMode'.toLowerCase()
    )({ mode });
  }
}
