import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Firestore, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { ReportComponent } from './report.component';

const TEST_STORE_ID = 'test-store-report';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  let firestore: Firestore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FirebaseTestingModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatButtonToggleModule,
        NoopAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => TEST_STORE_ID }),
          },
        },
      ],
      declarations: [ReportComponent],
    }).compileComponents();

    // Insert test data into Firestore emulator
    firestore = TestBed.inject(Firestore);
    await setDoc(doc(firestore, 'stores', TEST_STORE_ID), {
      id: TEST_STORE_ID,
      name: 'Test Store',
      address: 'Test Address',
      amount: 1000,
      altTel: '',
      comment: '',
      draft: '',
      needAttention: false,
      notes: '',
      status: '未着手',
      tel: '000-0000-0000',
      visible: true,
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    // Destroy fixture first to stop subscriptions
    fixture.destroy();
    // Clean up test data
    await deleteDoc(doc(firestore, 'stores', TEST_STORE_ID));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
