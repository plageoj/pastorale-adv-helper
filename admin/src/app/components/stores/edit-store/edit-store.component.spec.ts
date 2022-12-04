import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from 'src/app/models/store.model';
import { EditStoreComponent } from './edit-store.component';

describe('EditStoreComponent', () => {
  let component: EditStoreComponent;
  let fixture: ComponentFixture<EditStoreComponent>;

  const store: Store = {
    id: '1',
    name: 'name',
    address: 'address',
    tel: 'tel',
    altTel: 'altTel',
    notes: 'notes',
    comment: 'comment',
    visible: true,
    amount: 0,
    draft: '',
    needAttention: false,
    status: '未着手',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStoreComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSlideToggleModule,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: store }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('receives data from the dialog', () => {
    expect(component.store).toEqual(store);
  });

  it('has correct form value', () => {
    expect(component.storeForm.value).toEqual({
      id: '1',
      name: 'name',
      address: 'address',
      tel: 'tel',
      altTel: 'altTel',
      notes: 'notes',
      comment: 'comment',
      visible: true,
    });
  });
});
