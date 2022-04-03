import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Store } from '../models/store.model';
import { IFirestore } from './firestore.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements IFirestore<Store> {
  private col;

  constructor(private db: Firestore) {
    this.col = collection(this.db, 'stores') as CollectionReference<Store>;
  }

  getAll() {
    return collectionData(this.col);
  }

  get(storeId: string) {
    return docData(doc(this.col, storeId));
  }

  update(data: Store): Promise<void> {
    return setDoc(doc(this.col, data.id), data, { merge: true });
  }
}
