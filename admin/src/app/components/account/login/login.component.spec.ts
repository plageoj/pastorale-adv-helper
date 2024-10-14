import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';

import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FirebaseTestingModule, MatSnackBarModule, BrowserTestingModule],
      providers: [
        provideRouter([
          {
            path: '',
            component: LoginComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
