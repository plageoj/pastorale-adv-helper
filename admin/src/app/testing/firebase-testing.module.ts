import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { environment } from 'src/environments/environment';

const initialized = { firestore: false, auth: false, functions: false };

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const db = getFirestore();
      if (!initialized.firestore) {
        connectFirestoreEmulator(db, 'localhost', 8080);
        initialized.firestore = true;
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
    provideFunctions(() => {
      const functions = getFunctions();
      if (!initialized.functions) {
        connectFunctionsEmulator(functions, 'localhost', 9000);
        initialized.functions = true;
      }
      return functions;
    }),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
})
export class FirebaseTestingModule {}
