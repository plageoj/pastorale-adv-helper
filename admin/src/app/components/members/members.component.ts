import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members;
  columns: (keyof Member)[] = ['name', 'currentAddress', 'stores'];

  constructor(private mems: MemberService) {
    this.members = this.mems.getAll();
  }

  ngOnInit(): void {}
}
