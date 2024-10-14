import { inject, Injectable } from '@angular/core';
import {
  fetchAndActivate,
  getStringChanges,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { Observable } from 'rxjs';

export type Mode = 'contract' | 'receipt';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private readonly config = inject(RemoteConfig);

  constructor() {
    this.config.settings.minimumFetchIntervalMillis = 60 * 1000;
    fetchAndActivate(this.config);
  }

  getMode() {
    return getStringChanges(this.config, 'mode') as Observable<Mode>;
  }
}
