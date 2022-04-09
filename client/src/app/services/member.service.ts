import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  CollectionReference,
  doc,
  docData,
  Firestore,
  setDoc,
  WithFieldValue,
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  col;

  constructor(private db: Firestore, private auth: Auth) {
    this.col = collection(this.db, 'members') as CollectionReference<Member>;
  }

  me(): Observable<Member> {
    if (!this.auth.currentUser)
      return of<Member>({
        uid: '',
        name: '',
        homeAddress: '',
        currentAddress: '',
        comment: '',
        commute: {},
        job: '',
        studentNumber: 0,
        isAdmin: false,
        isHomeInHiroshima: false,
        stores: [],
      });
    return docData(doc(this.col, this.auth.currentUser?.uid));
  }

  update(data: WithFieldValue<Member>) {
    if (!this.auth.currentUser) throw new Error('not logged in');
    return setDoc(doc(this.col, this.auth.currentUser.uid), data, {
      merge: true,
    });
  }
}
