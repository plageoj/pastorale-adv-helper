import { TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { FirebaseTestingModule } from './testing/firebase-testing.module';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserTestingModule,
        NoopAnimationsModule,
        FirebaseTestingModule,
      ],
      providers: [
        provideRouter([
          {
            path: 'account/login',
            component: AppComponent,
          },
        ]),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title on toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain(
      '協賛広告ヘルパー'
    );
  });

  it('should have menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-sidenav-container')).toBeTruthy();
  });

  it('should logout the user', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigateByUrl').and.callThrough();
    fixture.detectChanges();

    await fixture.componentInstance.logout();
    fixture.detectChanges();
    expect(navigate).toHaveBeenCalledWith('/account/login');
  });
});
