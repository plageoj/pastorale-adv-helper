import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ModeService } from 'src/app/services/mode.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    standalone: false
})
export class ReportComponent {
  store;
  storeName = '';
  mode = '';

  constructor(
    private ss: StoreService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private ms: ModeService
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
