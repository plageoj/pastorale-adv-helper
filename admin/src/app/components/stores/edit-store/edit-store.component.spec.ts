import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
      imports: [
        EditStoreComponent,
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
