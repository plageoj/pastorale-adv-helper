import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
