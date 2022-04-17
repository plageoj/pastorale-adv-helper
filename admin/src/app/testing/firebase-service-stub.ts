import { Observable } from 'rxjs';
import { IFirestore } from '../services/firestore.interface';
import { cold } from 'jasmine-marbles';

export class FirebaseServiceStab<T> implements IFirestore<T> {
  get(id: string): Observable<T> {
    return cold('--a|', { a: { id } });
  }

  getAll(): Observable<T[]> {
    return cold('--a|', { a: [{ id: '1' }, { id: '2' }] });
  }

  update(data: T): Promise<void> {
    return Promise.resolve();
  }
}
