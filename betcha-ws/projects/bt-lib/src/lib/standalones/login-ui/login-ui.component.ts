import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { AUTH_CONFIG, AUTH_UI } from './provide-login-ui';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';

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
  readonly auth = inject(Auth);

  constructor() {
    effect(() => {
  
      this.ui.start(this.elem()?.nativeElement, this.config);
  
    });

  }

  signWithGoogle() {
    signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

}
