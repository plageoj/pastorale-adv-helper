import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: 'a, button',
    standalone: false
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  @Input('queryParam') queryParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
