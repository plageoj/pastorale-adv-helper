import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
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
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Member } from '../models/member.model';
import { IFirestore } from './firestore.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements IFirestore<Member> {
  private readonly db = inject(Firestore);
  private readonly func = inject(Functions);
  private readonly injector = inject(Injector);

  private get col() {
    return collection(this.db, 'members') as CollectionReference<Member>;
  }

  getAll(includeHidden = false): Observable<Member[]> {
    const queries: QueryConstraint[] = [orderBy('studentNumber', 'desc')];
    if (!includeHidden) {
      queries.push(where('visible', '==', true));
    }
    return runInInjectionContext(this.injector, () =>
      collectionData(query(this.col, ...queries))
    );
  }

  get(uid: string): Observable<Member> {
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.col, uid))
    ) as Observable<Member>;
  }

  async update(data: Member) {
    await httpsCallable(
      this.func,
      'elevateAsAdmin'.toLowerCase()
    )({ uid: data.uid, isAdmin: data.isAdmin });
    return setDoc(doc(this.col, data.uid), data, { merge: true });
  }
}
