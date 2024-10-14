import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSelectorComponent } from './status-selector.component';
import { StatusIconPipe } from 'src/app/pipes/status-icon.pipe';

describe('StatusSelectorComponent', () => {
  let component: StatusSelectorComponent;
  let fixture: ComponentFixture<StatusSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusSelectorComponent],
      imports: [StatusIconPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
