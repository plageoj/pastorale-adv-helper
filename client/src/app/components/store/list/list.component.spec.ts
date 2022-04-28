import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Auth, deleteUser } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { signInAnonymously } from '@firebase/auth';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ListComponent } from './list.component';
import { getTestScheduler } from 'jasmine-marbles';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

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
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    const auth = TestBed.inject(Auth);
    await signInAnonymously(auth);

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
