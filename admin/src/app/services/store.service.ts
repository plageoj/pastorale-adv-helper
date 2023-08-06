import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class StoreService implements IFirestore<Store> {
  private col;

  constructor(private db: Firestore) {
    this.col = collection(this.db, 'stores') as CollectionReference<Store>;
  }

  get id(): string {
    return doc(this.col).id;
  }

  getAll(
    { includeHidden }: { includeHidden: boolean } = { includeHidden: false }
  ) {
    const queries: QueryConstraint[] = [orderBy('needAttention', 'desc')];
    if (!includeHidden) queries.push(where('visible', '==', true));
    return collectionData(query(this.col, ...queries));
  }

  get(storeId: string) {
    return docData(doc(this.col, storeId));
  }

  update(data: WithFieldValue<Partial<Store>>): Promise<void> {
    if (typeof data.id !== 'string') throw new Error('id is required');
    return setDoc(doc(this.col, data.id), data, { merge: true });
  }
}
