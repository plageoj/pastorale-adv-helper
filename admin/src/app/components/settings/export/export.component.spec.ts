import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/services/store.service';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;
  let snackBar: MatSnackBar['open'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportComponent],
      imports: [MatSnackBarModule],
    }).compileComponents();

    const snack = TestBed.inject(MatSnackBar);
    const storeService = TestBed.inject(StoreService);

    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
