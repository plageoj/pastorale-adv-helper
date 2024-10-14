import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { connectAuthEmulator, getAuth } from '@firebase/auth';
import { connectFirestoreEmulator } from '@firebase/firestore';
import { environment } from 'src/environments/environment';

let initialized = { db: false, auth: false };

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const db = getFirestore();
      if (!initialized.db) {
        connectFirestoreEmulator(db, 'localhost', 8080);
        initialized.db = true;
      }
      return db;
    }),
    provideAuth(() => {
      const auth = getAuth();
      if (!initialized.auth) {
        connectAuthEmulator(auth, 'http://localhost:9099');
        initialized.auth = true;
      }
      return auth;
    }),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
})
export class FirebaseTestingModule {}
