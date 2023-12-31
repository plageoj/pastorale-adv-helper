import { TestBed } from '@angular/core/testing';

import { ModeService } from './mode.service';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(ModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
