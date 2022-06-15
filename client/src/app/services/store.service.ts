import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Status } from '../models/status.model';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  col;

  constructor(private db: Firestore, private auth: Auth) {
    this.col = collection(this.db, 'stores') as CollectionReference<Store>;
  }

  list() {
    if (!this.auth.currentUser) throw new Error('User not logged in');
    return collectionData(
      query<Store>(
        this.col,
        where('assigned.uid', '==', this.auth.currentUser.uid)
      )
    );
  }

  get(id: string) {
    return docData(doc(this.col, id));
  }

  setStatus(id: string, status: Status) {
    return setDoc(doc(this.col, id), { status }, { merge: true });
  }

  store(store: Store) {
    return setDoc(doc(this.col, store.id), store, { merge: true });
  }
}
