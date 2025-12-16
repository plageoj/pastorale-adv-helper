import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';
import { MemberDetailComponent } from './member-detail/member-detail.component';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      RouterLink,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatTableModule,
      MatTooltipModule,
      MemberDetailComponent,
    ]
})
export class MembersComponent implements OnInit {
  members: MatTableDataSource<Member> = new MatTableDataSource();
  columns: (keyof Member)[] = ['name', 'currentAddress', 'job', 'stores'];

  uid: string = '';

  private memberSubscription;

  constructor(
    private readonly mems: MemberService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
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
    this.members.filter = value;
  }

  changeShowInvisible(event: MatSlideToggleChange) {
    this.memberSubscription.unsubscribe();
    this.memberSubscription = this.mems
      .getAll(event.checked)
      .subscribe((mems) => {
        this.members.data = mems;
      });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
