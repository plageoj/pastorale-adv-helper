import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth, deleteUser, signInAnonymously } from '@angular/fire/auth';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, NavBarComponent],
      imports: [
        FirebaseTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: ListComponent },
        ]),
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
      ],
    }).compileComponents();

    await signInAnonymously(TestBed.inject(Auth));
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', async () => {
    const navigation = spyOn(
      TestBed.inject(Router),
      'navigateByUrl'
    ).and.callThrough();

    await component.logout();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(navigation).toHaveBeenCalledWith('/login');
  });

  afterEach(async () => {
    const auth = TestBed.inject(Auth);
    if (auth.currentUser) await deleteUser(auth.currentUser);
  });
});
