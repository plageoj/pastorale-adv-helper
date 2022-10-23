import { Component } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap, take } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  loading = false;
  progressMode: ProgressBarMode = 'indeterminate';
  progress = 0;

  constructor(private ms: MemberService, private snack: MatSnackBar) {}

  resetMembers() {
    this.snack
      .open('続行してよろしいですか？', '続行')
      .afterDismissed()
      .pipe(
        filter(({ dismissedByAction }) => dismissedByAction),
        switchMap(() => this.ms.getAll(true))
      )
      .pipe(take(1))
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
}
