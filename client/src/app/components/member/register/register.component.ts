import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommuteList } from 'src/app/models/commute.model';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  profile;
  loading = true;
  commuteOptions = CommuteList;

  constructor(
    private fb: FormBuilder,
    private mems: MemberService,
    private auth: Auth,
    private sb: MatSnackBar
  ) {
    this.profile = this.fb.group({
      uid: [''],
      name: [''],
      homeAddress: [''],
      currentAddress: [''],
      comment: [''],
      commute: this.fb.group({
        徒歩: [false],
        自転車: [false],
        原付: [false],
        バス: [false],
        電車: [false],
        車: [false],
      } as { [key in keyof Member['commute']]: any }),
      job: [''],
      studentNumber: [''],
      isAdmin: [false],
      isHomeInHiroshima: [false],
      stores: [[]],
      visible: [true],
    } as { [key in keyof Member]: any });
    this.profile.disable();
  }

  ngOnInit(): void {
    this.mems.me().subscribe((me) => {
      if (me) {
        this.profile.patchValue({
          ...me,
          studentNumber: `b${me.studentNumber}`,
        });
      }

      if (!me || Object.keys(me.commute).length === 0) {
        this.profile.patchValue({
          commute: {
            徒歩: true,
            自転車: false,
            原付: false,
            バス: false,
            電車: false,
            車: false,
          },
        });
      }

      if (!me) {
        const user = this.auth.currentUser;
        if (!user) return;
        this.profile.patchValue({
          uid: user.uid,
          name: user.displayName || '',
          studentNumber: user.email?.match(/(.\d+)/)?.[1],
        } as Partial<Member>);
      }
      this.loading = false;
      this.profile.enable();
    });
  }

  save() {
    this.loading = true;
    this.profile.disable();
    const member = this.profile.value;
    if (typeof member.studentNumber === 'string') {
      member.studentNumber = Number(
        member.studentNumber.replace(/[^0-9]/g, '')
      );
    }

    this.mems
      .update(member)
      .then(() => {
        this.loading = false;
        this.profile.enable();
        this.sb.open('保存しました');
      })
      .catch((e) => {
        console.error(e);
        this.sb.open('保存できませんでした！');
      });
  }
}
