import { Injectable } from '@angular/core';
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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { History } from '../models/history.model';
import { Store } from '../models/store.model';
import { IFirestore } from './firestore.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService implements IFirestore<History> {
  private col;

  constructor(private db: Firestore) {
    this.col = collection(this.db, 'history') as CollectionReference<History>;
  }

  getAll(storeId?: Store['id']): Observable<History[]> {
    const queries = [orderBy('year', 'desc')];
    if (storeId) {
      queries.push(where('storeId', '==', storeId));
    }
    return collectionData(query(this.col, ...queries));
  }

  get(id: string): Observable<History> {
    return docData(doc(this.col, id));
  }

  async update(data: History) {
    return setDoc(doc(this.col, data.id), data, { merge: true });
  }
}
