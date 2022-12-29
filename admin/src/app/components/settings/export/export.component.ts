import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  loading = false;

  constructor(private snack: MatSnackBar) {}

  export() {
    this.loading = true;
    this.snack.open('準備中。しばらくお待ちください…');
  }
}
