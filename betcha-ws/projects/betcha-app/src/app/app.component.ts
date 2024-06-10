import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_VERSION } from '../../../bt-lib/src/utils/provide/provide-version';
import { environment } from '../environments/environment';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthStore, PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  providers: [],
  imports: [SharedModule, PagesModule],
})
export class AppComponent {
  authStore = inject(AuthStore)
  user = this.authStore.user;

  logout() {
    this.authStore.signOut();
  }

}
