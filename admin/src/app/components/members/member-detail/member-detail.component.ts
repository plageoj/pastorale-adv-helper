import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Commute, CommuteList } from 'src/app/models/commute.model';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
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
