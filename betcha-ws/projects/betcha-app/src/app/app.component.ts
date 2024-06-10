import { Component, HostBinding, computed, inject } from '@angular/core';
import { AuthStore, PagesModule, RouterStore, SharedModule } from '@lib';
import { GroupsStore } from './stores/groups.store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  providers: [],
  imports: [SharedModule, PagesModule],
})
export class AppComponent {
  authStore = inject(AuthStore);
  groupsStore = inject(GroupsStore);

  readonly routerStore = inject(RouterStore);
  readonly hideNavBar = computed(() => Boolean(this.routerStore.data()['hideNavBar']));

  logout() {
    this.authStore.signOut();
  }

  @HostBinding('class')
  get themeClass() {
    const color = this.groupsStore.selectedGroup()?.theme || 'blue';
    return `theme-${color}`;
  }

  constructor() {
  }


}
