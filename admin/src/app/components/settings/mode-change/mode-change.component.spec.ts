import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { ModeChangeComponent } from './mode-change.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ModeChangeComponent', () => {
  let component: ModeChangeComponent;
  let fixture: ComponentFixture<ModeChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeChangeComponent],
      imports: [
        MatSnackBarModule,
        FirebaseTestingModule,
        MatSelectModule,
        MatIconModule,
        MatOptionModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
