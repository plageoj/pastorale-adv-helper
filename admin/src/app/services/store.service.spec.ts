import { TestBed } from '@angular/core/testing';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if the store id is empty', () => {
    expect(() => service.update({})).toThrowError('id is required');
  });
});
