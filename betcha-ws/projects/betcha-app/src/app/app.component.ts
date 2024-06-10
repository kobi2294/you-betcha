import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, effect, inject, input } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { APP_VERSION } from '../../../bt-lib/src/utils/provide/provide-version';
import { environment } from '../environments/environment';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthStore, PagesModule, RouterStore, SharedModule } from '@lib';
import { filter, map } from 'rxjs';

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

  readonly routerStore = inject(RouterStore);
  readonly hideNavBar = computed(() => Boolean(this.routerStore.data()['hideNavBar']));

  logout() {
    this.authStore.signOut();
  }

  constructor() {
  }


}
