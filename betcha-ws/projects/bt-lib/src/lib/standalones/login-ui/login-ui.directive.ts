import { Component, DestroyRef, Directive, ElementRef, effect, inject, viewChild } from '@angular/core';
import { AUTH_CONFIG, AUTH_UI } from './provide-login-ui';
import { Auth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: 'lib-login-ui',
  standalone: true,
})
export class LoginUiDirective {
  readonly elem = inject(ElementRef);
  readonly ui = inject(AUTH_UI);
  readonly config = inject(AUTH_CONFIG);
  readonly auth = inject(Auth);
  readonly doc = inject(DOCUMENT);
  readonly destroyRef = inject(DestroyRef)

  constructor() {
    this.ui.start(this.elem.nativeElement, this.config);

    const un = onAuthStateChanged(this.auth, user => {
      if (user && this.doc) {
        const iframe = this.doc.querySelector('body>iframe[ng-non-bindable]');
        if (iframe) {
          iframe.remove();
        }
      }
    })

    this.destroyRef.onDestroy(() => un());
    
  }

}
