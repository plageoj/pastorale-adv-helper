import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommuteComponent } from './commute/commute.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CommuteComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CommuteComponent],
})
export class UtilModule {}
