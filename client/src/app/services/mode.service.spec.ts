import { TestBed } from '@angular/core/testing';

import { RemoteConfig } from '@angular/fire/remote-config';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';
import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(ModeService);
    TestBed.inject(RemoteConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
