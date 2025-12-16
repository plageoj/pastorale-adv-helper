import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Commute, CommuteList } from 'src/app/models/commute.model';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      RouterLink,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatProgressBarModule,
      MatSlideToggleModule,
      MatTooltipModule,
    ]
})
export class MemberDetailComponent implements OnInit {
  memberForm;
  commuteOptions = CommuteList;
  loading = true;

  constructor(
    private fb: UntypedFormBuilder,
    private mem: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private sb: MatSnackBar
  ) {
    this.memberForm = this.fb.group({
      uid: [''],
      isAdmin: [false],
      studentNumber: [''],
      name: [''],
      comment: [''],
      currentAddress: [''],
      homeAddress: [''],
      isHomeInHiroshima: [''],
      job: [''],
      commute: this.fb.group({
        徒歩: [false],
        自転車: [false],
        原付: [false],
        バス: [false],
        電車: [false],
        車: [false],
      } as { [key in Commute]: any }),
    } as { [key in keyof Member]: any });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const uid = params.get('n');
      if (!uid) return;

      this.mem.get(uid).subscribe((member) => {
        this.memberForm.patchValue(member);
        if (
          typeof member === 'undefined' ||
          Object.keys(member.commute).length === 0
        ) {
          this.memberForm.get('commute')?.patchValue({
            徒歩: true,
            自転車: false,
            原付: false,
            バス: false,
            電車: false,
            車: false,
          });
        }
      });
      this.loading = false;
    });
  }

  async save() {
    this.loading = true;
    try {
      await this.mem.update(this.memberForm.value);
    } catch (e) {
      console.error(e);
      this.sb.open('保存できませんでした！');
      this.loading = false;
      return;
    }

    this.loading = false;
    this.sb.open('保存しました');
    this.router.navigateByUrl('/members');
  }
}
