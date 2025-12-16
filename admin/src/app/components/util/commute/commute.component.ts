import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Member } from 'src/app/models/member.model';

@Component({
    selector: 'app-commute',
    templateUrl: './commute.component.html',
    styleUrls: ['./commute.component.scss'],
    standalone: true,
    imports: [MatIconModule]
})
export class CommuteComponent {
  @Input() commute: Member['commute'] = {};
}
