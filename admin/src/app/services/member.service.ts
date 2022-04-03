import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
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
    return collectionData(this.col);
  }

  get(studentNumber: string) {
    return docData(doc(this.col, studentNumber));
  }
}
