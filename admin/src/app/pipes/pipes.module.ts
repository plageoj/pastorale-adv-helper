import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolPipe } from './bool.pipe';
import { StatusIconPipe } from './status-icon.pipe';

@NgModule({
  declarations: [BoolPipe, StatusIconPipe],
  imports: [CommonModule],
  exports: [BoolPipe, StatusIconPipe],
})
export class PipesModule {}
