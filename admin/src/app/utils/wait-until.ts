import { firstValueFrom, timer } from 'rxjs';

export const waitUntil = async (untilTruthy: Function): Promise<boolean> => {
  while (!untilTruthy()) {
    await firstValueFrom(timer(25));
  }
  return true;
};
