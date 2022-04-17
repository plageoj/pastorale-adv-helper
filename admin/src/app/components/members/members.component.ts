import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private mems: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.members = this.mems.getAll();
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(map((params) => params.get('n')))
      .subscribe((uid) => {
        this.uid = uid ?? '';
      });
  }

  openDetails(uid: Member['uid']) {
    if (this.uid === uid) {
      this.router.navigateByUrl(`/members`);
    } else {
      this.router.navigateByUrl(`/members?n=${uid}`);
    }
  }
}
