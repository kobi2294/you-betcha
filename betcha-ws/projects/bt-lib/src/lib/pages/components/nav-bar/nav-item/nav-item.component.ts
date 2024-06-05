import { Component, HostListener, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NoDoubleClickDirective } from '../../../../shared/directives/no-double-click.directive';

@Component({
  selector: 'lib-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss', 
  hostDirectives: [
    RouterLinkActive, 
    NoDoubleClickDirective,
    {
      directive: RouterLink, 
      inputs: [
        'routerLink: page'
      ]
    }
  ]
})
export class NavItemComponent {
  readonly page = input.required<string>();

  readonly icon = input.required<string>();

  readonly caption = input.required<string>();

  constructor(rla: RouterLinkActive) {
    rla.routerLinkActive = 'active';
  }



}
