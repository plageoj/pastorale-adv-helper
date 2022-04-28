import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatRowHarness } from '@angular/material/table/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MemberService } from 'src/app/services/member.service';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let activatedRoute: ActivatedRouteStub;
  let loader: HarnessLoader;
  let navigate: jasmine.Spy;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();

    const memberService = jasmine.createSpyObj('MemberService', ['getAll']);
    memberService.getAll.and.returnValue(
      cold('-m|', {
        m: [
          {
            uid: 'members.component.uid',
            isAdmin: false,
            studentNumber: 123456,
            name: 'name',
            comment: 'comment',
            currentAddress: 'currentAddress',
            homeAddress: 'homeAddress',
            isHomeInHiroshima: true,
            job: 'job',
            commute: {},
            stores: [],
          },
        ],
      })
    );

    await TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [
        FirebaseTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'members', component: MembersComponent },
        ]),
        MatTableModule,
        MatSidenavModule,
        NoopAnimationsModule,
      ],
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

  beforeEach(async () => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    const router = TestBed.inject(Router);
    navigate = spyOn(router, 'navigateByUrl').and.callThrough();

    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load members', async () => {
    const members = await loader.getHarness(MatRowHarness);
    expect((await members.getCells()).length).toBeGreaterThan(0);
  });

  it('should load uid parameter', () => {
    activatedRoute.setQueryParamMap({ n: 'uid' });
    expect(component.uid).toBe('uid');
  });

  it('should open member details', () => {
    fixture.nativeElement.querySelector('[mat-row]').click();
    expect(navigate).toHaveBeenCalledWith('/members?n=members.component.uid');
  });

  it('should close member details', () => {
    activatedRoute.setQueryParamMap({ n: 'members.component.uid' });
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[mat-row]').click();
    expect(navigate).toHaveBeenCalledWith('/members');
  });
});
