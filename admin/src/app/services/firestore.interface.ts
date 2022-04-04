import { Observable } from 'rxjs';

export interface IFirestore<T> {
  getAll(): Observable<T[]>;
  get(id: string): Observable<T>;

  update(data: T): Promise<void>;
}
