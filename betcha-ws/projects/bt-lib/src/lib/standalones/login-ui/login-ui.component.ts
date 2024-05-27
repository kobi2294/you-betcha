import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { AUTH_CONFIG, AUTH_UI } from './provide-login-ui';

@Component({
  selector: 'lib-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss', 
  standalone: true,
  imports: []
})
export class LoginUiComponent {
  readonly elem = viewChild<ElementRef>('login');
  readonly ui = inject(AUTH_UI);
  readonly config = inject(AUTH_CONFIG);

  constructor() {
    effect(() => {
  
      this.ui.start(this.elem()?.nativeElement, this.config);
  
    });

  }

}
