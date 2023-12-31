import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';

const initialized = { firestore: false, auth: false, functions: false };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
        connectFunctionsEmulator(functions, 'localhost', 5001);
        initialized.functions = true;
      }
      return functions;
    }),
  ],
})
export class FirebaseTestingModule {}
