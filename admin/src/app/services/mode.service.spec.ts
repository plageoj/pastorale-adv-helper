import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FirebaseTestingModule } from '../testing/firebase-testing.module';
import { ModeService } from './mode.service';

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

  describe('getMode', () => {
    it('should return an Observable', () => {
      const result = service.getMode();
      expect(result).toBeTruthy();
      expect(typeof result.subscribe).toBe('function');
    });

    it('should emit a valid mode value', (done) => {
      service.getMode().subscribe((mode) => {
        expect(['contract', 'receipt']).toContain(mode);
        done();
      });
    });
  });

  describe('setMode', () => {
    it('should return a Promise when setting mode to contract', () => {
      const result = service.setMode('contract');
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return a Promise when setting mode to receipt', () => {
      const result = service.setMode('receipt');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('after RemoteConfig initialization', () => {
    it('should initialize RemoteConfig asynchronously', fakeAsync(() => {
      tick(100);
      expect(service).toBeTruthy();
    }));

    it('should return mode from getMode after initialization', fakeAsync(() => {
      tick(100);
      let emittedMode: string | undefined;

      service.getMode().subscribe((mode) => {
        emittedMode = mode;
      });

      tick();
      expect(emittedMode).toBeDefined();
      expect(['contract', 'receipt']).toContain(emittedMode!);
    }));
  });
});
