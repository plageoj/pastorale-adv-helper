import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Auth, deleteUser, signInAnonymously } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTestScheduler } from 'jasmine-marbles';
import { MemberService } from 'src/app/services/member.service';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let auth: Auth;
  let snack: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, NavBarComponent],
      imports: [
        ReactiveFormsModule,
        FirebaseTestingModule,
        MatSnackBarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    auth = TestBed.inject(Auth);
    const { user } = await signInAnonymously(auth);

    const mem = TestBed.inject(MemberService);
    await mem.update({
      uid: user.uid,
      name: 'test',
      homeAddress: 'test',
      currentAddress: 'test',
      comment: 'test',
      commute: {},
      job: 'test',
      studentNumber: 123456,
      isAdmin: false,
      isHomeInHiroshima: false,
      stores: [],
      visible: false,
    });

    snack = spyOn(TestBed.inject(MatSnackBar), 'open').and.callThrough();

    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to register', fakeAsync(() => {
    const update = spyOn(
      TestBed.inject(MemberService),
      'update'
    ).and.returnValue(Promise.resolve());
    component.save();
    tick();
    fixture.detectChanges();
    expect(snack).toHaveBeenCalledWith('保存しました');

    update.and.returnValue(Promise.reject());
    component.save();
    tick();
    fixture.detectChanges();
    expect(snack).toHaveBeenCalledWith('保存できませんでした！');
    flush();
  }));

  afterEach(async () => {
    if (auth.currentUser) await deleteUser(auth.currentUser);
  });
});
