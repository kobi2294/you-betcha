import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss', 
  hostDirectives: [
    RouterLinkActive, 
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
