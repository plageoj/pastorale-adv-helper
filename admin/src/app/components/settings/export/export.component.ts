import { Component, inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, mergeMap, take } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { utils, WorkBook, writeFile } from 'xlsx';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  loading = false;
  ready = false;

  private workbook?: WorkBook;

  private readonly snack = inject(MatSnackBar);
  private readonly ss = inject(StoreService);

  constructor() {}

  export(purchasedOnly: boolean) {
    this.loading = true;
    this.snack.open('準備中。しばらくお待ちください…');

    const data: (string | number)[][] = [
      [
        'ID',
        '店舗名',
        '住所',
        '電話番号1',
        '電話番号2',
        '状態',
        '金額',
        '原稿',
        '担当者',
        '昨年担当',
        '昨年金額',
        '申し送り事項',
        '備考',
      ],
    ];

    this.ss
      .getAll()
      .pipe(
        take(1),
        mergeMap((store) => store),
        filter((store) => !purchasedOnly || store.amount > 0),
        map(
          ({
            id,
            name,
            address,
            tel,
            altTel,
            status,
            amount,
            draft,
            assigned,
            last,
            notes,
            comment,
          }) => [
            id,
            name,
            address,
            tel,
            altTel,
            status,
            amount,
            draft,
            assigned?.name ?? '',
            last?.name ?? '',
            last?.amount ?? '',
            notes,
            comment,
          ]
        )
      )
      .subscribe({
        next: (row) => {
          data.push(row);
        },
        complete: () => {
          this.workbook = utils.book_new();
          const worksheet = utils.aoa_to_sheet(data);
          utils.book_append_sheet(this.workbook, worksheet, 'データ');
          this.workbook.Sheets['データ'] = worksheet;
          this.ready = true;
          this.loading = false;
          this.snack.open('データの準備ができました。');
        },
      });
  }

  download() {
    if (!this.workbook) {
      this.snack.open('データの準備ができていません。');
      return;
    }
    writeFile(
      this.workbook,
      `広告先${formatDate(new Date(), 'yyyyMMdd', 'en')}.xlsx`
    );
  }
}
