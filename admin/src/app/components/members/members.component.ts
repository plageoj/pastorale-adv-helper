import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members;
  columns: (keyof Member)[] = ['name', 'currentAddress', 'job', 'stores'];

  uid: string = '';

  constructor(private mems: MemberService, private route: ActivatedRoute) {
    this.members = this.mems.getAll();
    this.route.queryParamMap
      .pipe(map((params) => params.get('n')))
      .subscribe((uid) => {
        this.uid = uid ?? '';
      });
  }

  ngOnInit(): void {}
}
