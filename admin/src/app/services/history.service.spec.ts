import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';
import { Firestore } from '@angular/fire/firestore';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(HistoryService);
    TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
