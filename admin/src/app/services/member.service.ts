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
import { Member } from '../models/member.model';
import { IFirestore } from './firestore.interface';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements IFirestore<Member> {
  private col;

  constructor(private db: Firestore) {
    this.col = collection(this.db, 'members') as CollectionReference<Member>;
  }

  getAll() {
    return collectionData(
      query(
        this.col,
        where('visible', '==', true),
        orderBy('studentNumber', 'desc')
      )
    );
  }

  get(uid: string) {
    return docData(doc(this.col, uid));
  }

  update(data: Member) {
    return setDoc(doc(this.col, data.uid), data, { merge: true });
  }
}
