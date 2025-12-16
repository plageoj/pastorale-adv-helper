import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  setDoc,
  where,
  query,
  orderBy,
  QueryConstraint,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { History } from '../models/history.model';
import { Store } from '../models/store.model';
import { IFirestore } from './firestore.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService implements IFirestore<History> {
  private readonly db = inject(Firestore);
  private readonly injector = inject(Injector);

  private get col() {
    return collection(this.db, 'history') as CollectionReference<History>;
  }

  get id() {
    return doc(this.col).id;
  }

  getAll(storeId?: Store['id']): Observable<History[]> {
    const queries: QueryConstraint[] = [orderBy('year', 'desc')];
    if (storeId) {
      queries.push(where('storeId', '==', storeId));
    }
    return runInInjectionContext(this.injector, () =>
      collectionData(query(this.col, ...queries))
    );
  }

  get(id: string): Observable<History> {
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.col, id))
    ) as Observable<History>;
  }

  async update(data: History) {
    return setDoc(doc(this.col, data.id), data, { merge: true });
  }
}
