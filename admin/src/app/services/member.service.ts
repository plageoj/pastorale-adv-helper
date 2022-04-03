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
} from '@angular/fire/firestore';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private col;

  constructor(private db: Firestore) {
    this.col = collection(this.db, 'members') as CollectionReference<Member>;
  }

  getAll() {
    return collectionData(query(this.col, orderBy('studentNumber', 'desc')));
  }

  get(uid: string) {
    return docData(doc(this.col, uid));
  }

  update(data: Member) {
    return setDoc(doc(this.col, data.uid), data, { merge: true });
  }
}
