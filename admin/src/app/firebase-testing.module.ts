import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

let initialized = false;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const db = getFirestore();
      if (!initialized) {
        connectFirestoreEmulator(db, 'localhost', 8080);
        initialized = true;
      }
      return db;
    }),
  ],
})
export class FirebaseTestingModule {}
