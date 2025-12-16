import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ModeService } from 'src/app/services/mode.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class ReportComponent {
  store;
  storeName = '';
  mode = '';

  constructor(
    private readonly ss: StoreService,
    private readonly route: ActivatedRoute,
    private readonly fb: UntypedFormBuilder,
    private readonly snack: MatSnackBar,
    private readonly router: Router,
    private readonly ms: ModeService
  ) {
    this.store = this.fb.group({
      id: [''],
      amount: [0],
      notes: [''],
      draft: [''],
      status: [''],
    });
    this.route.paramMap
      .pipe(mergeMap((params) => this.ss.get(params.get('id')!)))
      .subscribe((store) => {
        this.store.patchValue(store);
        this.storeName = store.name;
      });
    this.ms.getMode().subscribe((mode) => {
      this.mode = mode;
    });
  }

  async saveStore() {
    this.store.disable();
    await this.ss.store(this.store.value);
    this.snack.open('保存しました。ご協力ありがとうございます😍');
    this.router.navigateByUrl(`/stores/${this.store.value.id}`);
  }
}
