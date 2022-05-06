import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIconPipe } from './status-icon.pipe';

@NgModule({
  declarations: [StatusIconPipe],
  imports: [CommonModule],
  exports: [StatusIconPipe],
})
export class PipesModule {}
