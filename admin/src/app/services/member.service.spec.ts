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

  it('should get entire collections', async () => {
    const members = await firstValueFrom(service.getAll());
    expect(members).toBeInstanceOf(Array);
  });
});
