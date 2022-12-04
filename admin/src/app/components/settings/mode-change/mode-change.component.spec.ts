import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeChangeComponent } from './mode-change.component';

describe('ModeChangeComponent', () => {
  let component: ModeChangeComponent;
  let fixture: ComponentFixture<ModeChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
