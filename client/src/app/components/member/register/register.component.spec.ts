import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Auth, deleteUser, signInAnonymously } from '@angular/fire/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { MemberService } from 'src/app/services/member.service';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let auth: Auth;
  let snack: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FirebaseTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        NoopAnimationsModule,
        RegisterComponent,
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
