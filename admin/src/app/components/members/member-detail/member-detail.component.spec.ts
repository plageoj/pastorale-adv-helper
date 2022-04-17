import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { RouterLinkStubDirective } from 'src/app/testing/router-link-stub';
import { MemberDetailComponent } from './member-detail.component';

describe('MemberDetailComponent', () => {
  let component: MemberDetailComponent;
  let fixture: ComponentFixture<MemberDetailComponent>;
  let activatedRoute: ActivatedRouteStub;
  let navigate: Router['navigateByUrl'];
  let snackbar: MatSnackBar['open'];

  beforeEach(async () => {
    const memberService = jasmine.createSpyObj('MemberService', [
      'get',
      'update',
    ]);
    memberService.get.and.returnValue(
      cold('-m|', {
        m: {
          uid: 'uid',
          isAdmin: false,
          studentNumber: 12345678,
          name: 'name',
          comment: 'comment',
          currentAddress: 'currentAddress',
          homeAddress: 'homeAddress',
          isHomeInHiroshima: true,
          job: 'job',
          commute: {},
          stores: [],
        } as Member,
      })
    );
    memberService.update.and.returnValue(Promise.resolve());

    activatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      imports: [
        FirebaseTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'members',
            component: MemberDetailComponent,
          },
        ]),
      ],
      declarations: [MemberDetailComponent, RouterLinkStubDirective],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: MemberService,
          useValue: memberService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    activatedRoute.setQueryParamMap({ n: 'uid' });
    fixture = TestBed.createComponent(MemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const snack = TestBed.inject(MatSnackBar);

    navigate = spyOn(router, 'navigateByUrl').and.callThrough();
    snackbar = spyOn(snack, 'open').and.callThrough();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read a member', () => {
    expect(component.memberForm.value.name).toBe('name');
  });

  it('save current member', fakeAsync(() => {
    component.save();
    expect(component.loading).toBeTrue();
    tick();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(snackbar).toHaveBeenCalledWith('保存しました');
    expect(navigate).toHaveBeenCalledWith('/members');
    expect(component.loading).toBe(false);
    flush();
  }));

  it('should display error on saving fails', fakeAsync(() => {
    const memberService = TestBed.inject(MemberService);
    (memberService.update as jasmine.Spy).and.returnValue(Promise.reject());

    component.save();
    expect(component.loading).toBeTrue();
    tick();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(snackbar).toHaveBeenCalledWith('保存できませんでした！');
    expect(navigate).not.toHaveBeenCalled();
    expect(component.loading).toBe(false);
    flush();
  }));
});
