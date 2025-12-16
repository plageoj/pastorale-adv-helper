import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    standalone: false
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  @Input('queryParams') queryParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
