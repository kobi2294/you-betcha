import { Component, HostBinding, effect, input } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly level = input<1 | 2>(1);


  @HostBinding('attr.h-level')
  hLevel: number = 1;

  constructor() {
    effect(() => {
      this.hLevel = this.level();
    })
  }




}
