import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import {
  MatDialog as MatDialog,
  MatDialogModule as MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule as MatListModule } from '@angular/material/list';
import {
  MatSnackBar as MatSnackBar,
  MatSnackBarModule as MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule as MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { Store } from 'src/app/models/store.model';
import { MemberService } from 'src/app/services/member.service';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { CommuteComponent } from '../../util/commute/commute.component';
import { AssignMemberComponent } from './assign-member.component';

describe('AssignMemberComponent', () => {
  let component: AssignMemberComponent;
  let fixture: ComponentFixture<AssignMemberComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    const storeService = jasmine.createSpyObj<StoreService>('StoreService', [
      'get',
      'update',
    ]);
    storeService.get.and.returnValue(
      cold('-a|', {
        a: {
          id: 'store-id',
          name: 'name',
          address: 'address',
          comment: 'comment',
          tel: 'tel',
          altTel: 'altTel',
          amount: 0,
          draft: 'draft',
          needAttention: false,
          notes: 'notes',
          visible: true,
          status: '担当者なし',
          assigned: {
            uid: 'uid',
          },
          last: {},
        } as Store,
      })
    );
    storeService.update.and.returnValue(Promise.resolve());

    const memberService = jasmine.createSpyObj('MemberService', [
      'getAll',
      'update',
    ]);
    memberService.getAll.and.returnValue(
      cold('-m|', {
        m: [
          {
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
            stores: [
              {
                id: 'store-id',
              },
            ],
          } as Member,
        ],
      })
    );
    memberService.update.and.returnValue(Promise.resolve());

    activatedRoute = new ActivatedRouteStub({ id: 'store-id' });

    await TestBed.configureTestingModule({
      declarations: [AssignMemberComponent, CommuteComponent],
      imports: [
        FirebaseTestingModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: StoreService,
          useValue: storeService,
        },
        {
          provide: MemberService,
          useValue: memberService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read a store', () => {
    expect(component.store).toBeTruthy();
  });

  it('should read members', () => {
    expect(component.members.data.length).toBeGreaterThanOrEqual(1);
  });

  it('should open edit dialog', () => {
    const dialog = spyOn<any>(
      TestBed.inject(MatDialog),
      'open'
    ).and.returnValue({
      afterClosed: () => of(undefined),
    });
    component.edit();
    expect(dialog).toHaveBeenCalled();
  });

  it('should filter displayed members', () => {
    const input = fixture.nativeElement.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    input.value = 'name';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.members.filter).toBe('name');
  });

  it('should assign and unassign member', fakeAsync(() => {
    const snack = spyOn(TestBed.inject(MatSnackBar), 'open');

    expect(component.store?.status).toBe('担当者なし');
    component.assignMember(component.members.data[0]);
    tick();
    fixture.detectChanges();
    expect(snack).toHaveBeenCalledWith('保存しました');
    expect(component.store?.status).toBe('未着手');

    const storeService = TestBed.inject(StoreService);
    (storeService.update as jasmine.Spy).and.returnValue(Promise.reject());

    component.unassign();
    tick();
    fixture.detectChanges();
    expect(snack).toHaveBeenCalledWith('保存できませんでした！');
    flush();
  }));

  it('should not assign when store is accidentally empty', () => {
    delete component.store;
    const unassign = spyOn(component, 'unassign').and.returnValue(
      Promise.resolve()
    );
    component.assignMember(component.members.data[0]);
    expect(unassign).not.toHaveBeenCalled();
  });

  it('should not unassign when store is accidentally empty', async () => {
    delete component.store;
    expect(await component.unassign()).toBeFalsy();
  });
});
