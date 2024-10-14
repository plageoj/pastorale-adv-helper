import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool',
  standalone: true,
})
export class BoolPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'はい' : 'いいえ';
  }
}
