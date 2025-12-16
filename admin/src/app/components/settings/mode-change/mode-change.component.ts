import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mode, ModeService } from 'src/app/services/mode.service';

@Component({
    selector: 'app-mode-change',
    templateUrl: './mode-change.component.html',
    styleUrls: ['./mode-change.component.scss'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatSelectModule,
    ]
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
