import { Component, Input } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-commute',
  templateUrl: './commute.component.html',
  styleUrls: ['./commute.component.scss'],
})
export class CommuteComponent {
  @Input() commute: Member['commute'] = {};

  constructor() {}
}
