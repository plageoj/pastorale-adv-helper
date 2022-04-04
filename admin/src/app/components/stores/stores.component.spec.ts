import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFirestoreEmulator } from '@firebase/firestore';
import { environment } from 'src/environments/environment';

import { StoresComponent } from './stores.component';

describe('StoresComponent', () => {
  let component: StoresComponent;
  let fixture: ComponentFixture<StoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoresComponent],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => {
          const db = getFirestore();
          connectFirestoreEmulator(db, 'localhost', 8080);
          return db;
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
