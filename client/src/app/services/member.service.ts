import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
  WithFieldValue,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  col;
  firestore = inject(Firestore);

  constructor(private auth: Auth) {
    this.col = collection(this.firestore, 'members');
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
        visible: true,
      });
    return docData(
      doc(this.col, this.auth.currentUser.uid)
    ) as Observable<Member>;
  }

  update(data: WithFieldValue<Partial<Member>>) {
    if (!this.auth.currentUser) throw new Error('not logged in');
    return setDoc(doc(this.col, this.auth.currentUser.uid), data, {
      merge: true,
    });
  }
}
