import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { ModeChangeComponent } from './mode-change.component';

describe('ModeChangeComponent', () => {
  let component: ModeChangeComponent;
  let fixture: ComponentFixture<ModeChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeChangeComponent],
      imports: [MatSnackBarModule, FirebaseTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
