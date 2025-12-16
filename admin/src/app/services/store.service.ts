import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  QueryConstraint,
  setDoc,
  where,
  WithFieldValue,
} from '@angular/fire/firestore';
import { Store } from '../models/store.model';
import { IFirestore } from './firestore.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements IFirestore<Store> {
  private readonly db = inject(Firestore);
  private readonly injector = inject(Injector);

  private get col() {
    return collection(this.db, 'stores') as CollectionReference<Store>;
  }

  get id(): string {
    return doc(this.col).id;
  }

  getAll(options?: { includeHidden: boolean }): Observable<Store[]> {
    const { includeHidden = false } = options ?? {};
    const queries: QueryConstraint[] = [orderBy('needAttention', 'desc')];
    if (!includeHidden) queries.push(where('visible', '==', true));
    return runInInjectionContext(this.injector, () =>
      collectionData(query(this.col, ...queries))
    );
  }

  get(storeId: string): Observable<Store> {
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.col, storeId))
    ) as Observable<Store>;
  }

  update(data: WithFieldValue<Partial<Store>>): Promise<void> {
    if (typeof data.id !== 'string') throw new Error('id is required');
    return setDoc(doc(this.col, data.id), data, { merge: true });
  }
}
