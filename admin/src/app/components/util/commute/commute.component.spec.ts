import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuteComponent } from './commute.component';

describe('CommuteComponent', () => {
  let component: CommuteComponent;
  let fixture: ComponentFixture<CommuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommuteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
