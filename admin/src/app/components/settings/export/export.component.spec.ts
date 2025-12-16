import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { ExportComponent } from './export.component';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportComponent, MatSnackBarModule, FirebaseTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
