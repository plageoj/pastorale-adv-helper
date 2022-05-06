import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { FirebaseTestingModule } from '../testing/firebase-testing.module';

import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(MemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty member for unauthenticated user', async () => {
    expect((await firstValueFrom(service.me())).uid).toEqual('');
  });

  it('should throw an error for update when user is not authenticated', async () => {
    expect(() => service.update({ name: 'test' })).toThrowError(
      'not logged in'
    );
  });
});
