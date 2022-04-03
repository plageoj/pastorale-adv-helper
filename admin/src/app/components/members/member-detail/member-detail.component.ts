import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  memberForm;

  constructor(
    private mem: MemberService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.memberForm = this.fb.group({
      studentNumber: [''],
      name: [''],
      comment: [''],
      currentAddress: [''],
      homeAddress: [''],
      isHomeInHiroshima: [''],
      job: [''],
    } as { [key in keyof Member]: any });

    this.route.queryParamMap.subscribe((params) => {
      const studentNumber = params.get('n');
      if (!studentNumber) return;

      this.mem.get(studentNumber).subscribe((member) => {
        this.memberForm.patchValue(member);
      });
    });
  }

  ngOnInit(): void {}
}
