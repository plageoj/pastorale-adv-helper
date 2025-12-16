import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    standalone: true
})
export class RouterLinkStubDirective {
  @Input() routerLink: any;
  @Input() queryParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}
