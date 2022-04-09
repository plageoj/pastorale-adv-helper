import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-commute',
  templateUrl: './commute.component.html',
  styleUrls: ['./commute.component.scss'],
})
export class CommuteComponent implements OnInit {
  @Input('commute') commute: Member['commute'] = {};

  constructor() {}

  ngOnInit(): void {}
}
