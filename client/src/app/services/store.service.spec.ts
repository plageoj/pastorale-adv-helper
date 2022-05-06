import { TestBed } from '@angular/core/testing';
import { Auth, deleteUser, signInAnonymously } from '@angular/fire/auth';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;
  let auth: Auth;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(StoreService);
    auth = TestBed.inject(Auth);

    await signInAnonymously(auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error when user is not authenticated', async () => {
    if (auth.currentUser) await deleteUser(auth.currentUser);
    expect(() => service.list()).toThrowError('User not logged in');
  });

  it('should get single store by id', async () => {
    await service.setStatus('test-store', '未着手');
    const store = await firstValueFrom(service.get('test-store'));
    expect(store).toBeTruthy();
  });

  afterEach(async () => {
    if (auth.currentUser) await deleteUser(auth.currentUser);
  });
});
