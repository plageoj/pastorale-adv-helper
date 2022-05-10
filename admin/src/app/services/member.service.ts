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
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Member } from '../models/member.model';
import { IFirestore } from './firestore.interface';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements IFirestore<Member> {
  private col;

  constructor(private db: Firestore, private func: Functions) {
    this.col = collection(this.db, 'members') as CollectionReference<Member>;
  }

  getAll(includeHidden = false) {
    const queries = [orderBy('studentNumber', 'desc')];
    if (!includeHidden) {
      queries.push(where('visible', '==', true));
    }
    return collectionData(query(this.col, ...queries));
  }

  get(uid: string) {
    return docData(doc(this.col, uid));
  }

  async update(data: Member) {
    await httpsCallable(
      this.func,
      'elevateAsAdmin'
    )({ uid: data.uid, isAdmin: data.isAdmin });
    return setDoc(doc(this.col, data.uid), data, { merge: true });
  }
}
