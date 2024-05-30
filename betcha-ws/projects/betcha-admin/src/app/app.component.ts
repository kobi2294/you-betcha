import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, User, getRedirectResult } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { LoginUiComponent } from '@lib';
import { ReplaySubject, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginUiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  readonly auth = inject(Auth)
  readonly user$ = new ReplaySubject<User | null>(1);

  readonly showLogin$ = this.user$.pipe(
    map(user => !user));

  constructor() {
    this.auth.onAuthStateChanged(this.user$);
    this.user$.subscribe(val => console.log('User is', val));
  }

  logout() {
    this.auth.signOut();
  }
}
