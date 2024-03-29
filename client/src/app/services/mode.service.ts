import { Injectable } from '@angular/core';
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
  constructor(private config: RemoteConfig) {
    this.config.settings.minimumFetchIntervalMillis = 60 * 1000;
    fetchAndActivate(this.config);
  }

  getMode() {
    return getStringChanges(this.config, 'mode') as Observable<Mode>;
  }
}
