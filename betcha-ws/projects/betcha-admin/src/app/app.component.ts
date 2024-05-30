import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Auth, User, getRedirectResult } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { AuthStore, LoginUiDirective } from '@lib';
import { ReplaySubject, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginUiDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  authStore = inject(AuthStore)
  user = this.authStore.user;
  loginRequired = this.authStore.loginRequired;

  logout() {
    this.authStore.signOut();
  }
}
