import { BoolPipe } from './bool.pipe';

describe('BoolPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return はい for true', () => {
    const pipe = new BoolPipe();
    expect(pipe.transform(true)).toBe('はい');
  });

  it('should return いいえ for false', () => {
    const pipe = new BoolPipe();
    expect(pipe.transform(false)).toBe('いいえ');
  });
});
