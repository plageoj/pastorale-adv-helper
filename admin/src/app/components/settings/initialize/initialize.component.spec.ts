import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializeComponent } from './initialize.component';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';

describe('InitializeComponent', () => {
  let component: InitializeComponent;
  let fixture: ComponentFixture<InitializeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitializeComponent],
      imports: [BrowserTestingModule, FirebaseTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InitializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
