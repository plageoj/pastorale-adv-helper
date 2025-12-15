import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly injector = inject(Injector);

  private get col() {
    return collection(this.firestore, 'stores');
  }

  list(): Observable<Store[]> {
    if (!this.auth.currentUser) throw new Error('User not logged in');
    return runInInjectionContext(this.injector, () =>
      collectionData(
        query(this.col, where('assigned.uid', '==', this.auth.currentUser!.uid))
      )
    ) as Observable<Store[]>;
  }

  get(id: string): Observable<Store> {
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.col, id))
    ) as Observable<Store>;
  }

  setStatus(id: string, status: Status) {
    return setDoc(doc(this.col, id), { status }, { merge: true });
  }

  store(store: Store) {
    return setDoc(doc(this.col, store.id), store, { merge: true });
  }
}
