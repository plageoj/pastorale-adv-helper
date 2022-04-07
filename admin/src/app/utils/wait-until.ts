import { firstValueFrom, interval } from 'rxjs';

export const waitUntil = async (untilTruthy: Function): Promise<boolean> => {
  while (!untilTruthy()) {
    await firstValueFrom(interval(25));
  }
  return true;
};
