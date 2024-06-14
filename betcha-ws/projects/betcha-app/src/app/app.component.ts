import { Component, HostBinding, computed, effect, inject } from '@angular/core';
import { AuthStore, PagesModule, RouterStore, SharedModule } from '@lib';
import { GroupsStore } from './stores/groups/groups.store';
import { changeTheme } from './utils/manifest-colors';
import { DOCUMENT } from '@angular/common';

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
  doc = inject(DOCUMENT);

 
  readonly routerStore = inject(RouterStore);
  readonly hideNavBar = computed(() => Boolean(this.routerStore.data()['hideNavBar']));
  readonly isPublic = computed(() => Boolean(this.routerStore.data()['public']));

  logout() {
    this.authStore.signOut();
  }

  @HostBinding('class')
  get themeClass() {
    const color = this.groupsStore.selectedGroup()?.theme || 'blue';
    return `theme-${color}`;
  }

  constructor() {
    effect(() => {
      const theme = this.groupsStore.selectedGroup()?.theme || 'blue';

      changeTheme(theme, this.doc);

    })
  }


}
