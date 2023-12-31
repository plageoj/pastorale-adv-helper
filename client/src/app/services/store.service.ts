import { inject, Injectable } from '@angular/core';
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
  col;
  firestore = inject(Firestore);

  constructor(private auth: Auth) {
    this.col = collection(this.firestore, 'stores');
  }

  list(): Observable<Store[]> {
    if (!this.auth.currentUser) throw new Error('User not logged in');
    return collectionData(
      query(this.col, where('assigned.uid', '==', this.auth.currentUser.uid))
    ) as Observable<Store[]>;
  }

  get(id: string): Observable<Store> {
    return docData(doc(this.col, id)) as Observable<Store>;
  }

  setStatus(id: string, status: Status) {
    return setDoc(doc(this.col, id), { status }, { merge: true });
  }

  store(store: Store) {
    return setDoc(doc(this.col, store.id), store, { merge: true });
  }
}
