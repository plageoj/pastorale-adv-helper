import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mode, ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-mode-change',
  templateUrl: './mode-change.component.html',
  styleUrls: ['./mode-change.component.scss'],
})
export class ModeChangeComponent {
  mode;
  loading = false;
  private readonly ms = inject(ModeService);
  private readonly snack = inject(MatSnackBar);

  constructor() {
    this.mode = new FormControl('', Validators.required);

    this.ms.getMode().subscribe((mode) => {
      console.log(mode);
      this.mode.setValue(mode);
    });
  }

  async saveMode() {
    const mode = this.mode.value as Mode;
    if (mode !== 'contract' && mode !== 'receipt') return;
    this.loading = true;
    await this.ms.setMode(mode);
    this.snack.open('モードを設定しました');
    this.loading = false;
  }
}
