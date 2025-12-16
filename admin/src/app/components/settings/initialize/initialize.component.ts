import { Component } from '@angular/core';
import { deleteField } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { filter, firstValueFrom, switchMap, take } from 'rxjs';
import { HistoryService } from 'src/app/services/history.service';
import { MemberService } from 'src/app/services/member.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-initialize',
    templateUrl: './initialize.component.html',
    styleUrls: ['./initialize.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatProgressBarModule]
})
export class InitializeComponent {
  loading = false;
  progressMode: ProgressBarMode = 'indeterminate';
  progress = 0;

  constructor(
    private ms: MemberService,
    private snack: MatSnackBar,
    private hs: HistoryService,
    private ss: StoreService
  ) {}

  resetMembers() {
    this.snack
      .open('続行してよろしいですか？', '続行')
      .afterDismissed()
      .pipe(
        filter(({ dismissedByAction }) => dismissedByAction),
        switchMap(() => this.ms.getAll()),
        take(1)
      )
      .subscribe(async (members) => {
        this.loading = true;
        this.progressMode = 'determinate';
        const total = members.length;
        try {
          for (const [index, member] of members.entries()) {
            this.progress = (index / total) * 100;
            await this.ms.update({ ...member, visible: false });
          }
          this.snack.open('完了しました。');
        } catch (e) {
          console.error(e);
          this.snack.open('エラーが発生しました。');
        }
        this.loading = false;
      });
  }

  updateHistory() {
    this.snack
      .open('続行してよろしいですか？', '続行')
      .afterDismissed()
      .pipe(
        filter(({ dismissedByAction }) => dismissedByAction),
        switchMap(() => this.ms.getAll(true)),
        take(1)
      )
      .subscribe(async (members) => {
        this.loading = true;
        this.progressMode = 'determinate';

        try {
          for (const [index, member] of members.entries()) {
            this.progress = (index / members.length) * 100;
            for (const { id } of member.stores) {
              const store = await firstValueFrom(this.ss.get(id));

              await this.ss.update({
                id,
                last: {
                  name: member.name,
                  amount: store.amount,
                  uid: member.uid,
                },
                assigned: deleteField(),
                status: '担当者なし',
                amount: 0,
                comment: '',
              });

              await this.hs.update({
                id: this.hs.id,
                memberId: member.uid,
                memberName: member.name,
                storeId: id,
                amount: store.amount,
                draft: store.draft,
                notes: store.notes,
                year: new Date().getFullYear(),
              });
            }

            await this.ms.update({
              ...member,
              stores: [],
            });
          }
          this.snack.open('完了しました。');
        } catch (e) {
          console.error(e);
          this.snack.open('エラーが発生しました。');
        }
        this.loading = false;
      });
  }
}
