import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
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
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly injector = inject(Injector);

  private get col() {
    return collection(this.firestore, 'members');
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
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.col, this.auth.currentUser!.uid))
    ) as Observable<Member>;
  }

  update(data: WithFieldValue<Partial<Member>>) {
    if (!this.auth.currentUser) throw new Error('not logged in');
    return setDoc(doc(this.col, this.auth.currentUser.uid), data, {
      merge: true,
    });
  }
}
