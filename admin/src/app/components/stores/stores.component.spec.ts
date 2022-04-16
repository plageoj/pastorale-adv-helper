import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { Store } from 'src/app/models/store.model';
import { waitUntil } from 'src/app/utils/wait-until';
import { StoresComponent } from './stores.component';

describe('StoresComponent', () => {
  let component: StoresComponent;
  let fixture: ComponentFixture<StoresComponent>;
  let loader: HarnessLoader;

  const member = {
    uid: 'assigned-uid',
    name: 'Assigned member',
    comment: '',
    currentAddress: '',
    homeAddress: '',
    isAdmin: false,
    isHomeInHiroshima: false,
    job: '',
    stores: [],
    studentNumber: 0,
    commute: {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoresComponent],
      imports: [
        FirebaseTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table', () => {
    const table = fixture.nativeElement.querySelector(
      'table'
    ) as HTMLTableElement;
    expect(table.tagName).toBe('TABLE');
  });

  it('should filter data', () => {
    const filter = fixture.nativeElement.querySelector('input');
    filter.value = 'Store';
    filter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.stores.filter).toBe('Store');
  });

  it('updates attention', async () => {
    const store: Store = {
      id: 'store-id',
      name: 'Store',
      address: 'Address',
      tel: 'Tel',
      altTel: 'AltTel',
      visible: true,
      status: '担当者なし',
      amount: 0,
      comment: '',
      draft: '',
      notes: '',
      needAttention: false,
      assigned: member,
    };
    const event = new MatCheckboxChange();
    event.checked = true;
    await component.attention(store, event);
    fixture.detectChanges();
    expect(component.stores.data[0].needAttention).toBeTrue();
  });

  it('shows invisible stores', async () => {
    const store: Store = {
      id: 'invisible-store-id',
      name: 'Invisible Store',
      address: 'Invisible Address',
      tel: 'Invisible Tel',
      altTel: 'Invisible AltTel',
      visible: false,
      status: '担当者なし',
      amount: 0,
      comment: '',
      draft: '',
      notes: '',
      needAttention: false,
      assigned: member,
    };
    const event = new MatCheckboxChange();
    event.checked = false;
    await component.attention(store, event);
    fixture.detectChanges();
    const length = component.stores.data.length;
    const toggles = await loader.getAllHarnesses(MatSlideToggleHarness);
    expect(toggles.length).toBe(1);
    await toggles[0].toggle();
    fixture.detectChanges();
    await waitUntil(() => component.stores.data.length !== length);
    expect(component.stores.data.length).toBe(length + 1);
  });
});
