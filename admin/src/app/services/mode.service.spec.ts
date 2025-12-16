import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { FirebaseTestingModule } from '../testing/firebase-testing.module';
import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FirebaseTestingModule],
    });
    service = TestBed.inject(ModeService);

    // Wait for initialization to complete
    await service.ready;
  });

  describe('getMode', () => {
    it('should return an Observable', () => {
      const result = service.getMode();
      expect(result).toBeTruthy();
      expect(typeof result.subscribe).toBe('function');
    });

    it('should return contract as default mode', async () => {
      const mode = await firstValueFrom(service.getMode());
      expect(mode).toBe('contract');
    });
  });

  describe('setMode', () => {
    it('should return a Promise', () => {
      const result = service.setMode('contract');
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
