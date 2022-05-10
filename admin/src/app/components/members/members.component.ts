import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members: MatTableDataSource<Member> = new MatTableDataSource();
  columns: (keyof Member)[] = ['name', 'currentAddress', 'job', 'stores'];

  uid: string = '';

  private memberSubscription;

  constructor(
    private mems: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.memberSubscription = this.mems.getAll().subscribe((mems) => {
      this.members.data = mems;
    });
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

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.members.filter = value ? value : '';
  }

  changeShowInvisible(event: MatSlideToggleChange) {
    this.memberSubscription.unsubscribe();
    this.memberSubscription = this.mems
      .getAll(event.checked)
      .subscribe((mems) => {
        this.members.data = mems;
      });
  }
}
