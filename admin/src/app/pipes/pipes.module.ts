import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolPipe } from './bool.pipe';

@NgModule({
  declarations: [BoolPipe],
  imports: [CommonModule],
  exports: [BoolPipe],
})
export class PipesModule {}
