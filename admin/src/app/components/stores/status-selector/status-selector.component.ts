import { Component, EventEmitter, Output } from '@angular/core';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.scss'],
})
export class StatusSelectorComponent {
  statusList: Status[] = [
    '担当者なし',
    '未着手',
    '連絡済み',
    '先方の返事待ち',
    '契約書未確認',
    '契約書受取済み',
    '領収書未確認',
    '領収書受取済み',
    '広告掲載NG',
  ];

  @Output() choose = new EventEmitter<Status>();

  constructor() {}
}
