import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import * as auth from '@angular/fire/auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FirebaseTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: '', component: LoginComponent },
        ]),
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
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

  it('should open popup', () => {
    const authspy = jasmine.createSpyObj(auth, ['signInWithPopup']);
    const signin = authspy.signInWithPopup.and.returnValue(Promise.resolve());
    fixture.nativeElement.querySelector('button[title="ログイン"]').click();
    expect(signin).toHaveBeenCalled();
  });
});
