import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterOutlet } from '@angular/router';
import { FirebaseUIModule } from 'firebaseui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirebaseUIModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly auth = inject(AngularFireAuth);
  readonly user$ = this.auth.user;

  constructor() {
    this.auth.user.subscribe(u => console.log('User', u));
    this.auth.authState.subscribe(a => console.log('Auth State', a));
  }

  logout() {
    this.auth.signOut();
  }
}
