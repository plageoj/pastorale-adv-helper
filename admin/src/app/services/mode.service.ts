import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  fetchAndActivate,
  getString,
  getStringChanges,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { Observable } from 'rxjs';

export type Mode = 'contract' | 'receipt';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  constructor(private config: RemoteConfig, private fn: Functions) {
    this.config.settings.minimumFetchIntervalMillis = 3600000;
    fetchAndActivate(this.config);
  }

  getMode() {
    return getStringChanges(this.config, 'mode') as Observable<Mode>;
  }

  setMode(mode: Mode) {
    return httpsCallable<{ mode: Mode }>(this.fn, 'setMode')({ mode });
  }
}
