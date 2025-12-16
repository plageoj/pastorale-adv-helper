import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import * as auth from '@angular/fire/auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FirebaseTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: '', component: LoginComponent },
        ]),
        LoginComponent,
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

  xit('should open popup', () => {
    const authspy = jasmine.createSpyObj(auth, ['signInWithPopup']);
    const signin = authspy.signInWithPopup.and.returnValue(Promise.resolve());
    fixture.nativeElement.querySelector('button[title="ログイン"]').click();
    expect(signin).toHaveBeenCalled();
  });
});
