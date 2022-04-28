import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status.model';

@Pipe({
  name: 'statusIcon',
})
export class StatusIconPipe implements PipeTransform {
  transform(value?: Status): string {
    const iconTable: { [key in Status]: string } = {
      担当者なし: 'person_off',
      未着手: 'call',
      先方の返事待ち: 'phone_callback',
      広告掲載NG: 'cancel',
      連絡済み: 'directions_walk',
      契約書未確認: 'pending',
      契約書受取済み: 'check_circle',
      領収書未確認: 'pending',
      領収書受取済み: 'check_circle',
    };
    if (!value) return '';
    return iconTable[value];
  }
}
