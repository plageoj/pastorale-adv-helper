import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFirestoreEmulator } from '@firebase/firestore';
import { environment } from 'src/environments/environment';
import { provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator, getAuth } from '@firebase/auth';

let initialized = { db: false, auth: false };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
  ],
})
export class FirebaseTestingModule {}
