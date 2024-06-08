import { Component, computed, effect, inject, input } from '@angular/core';
import { AuthStore, EditModule, PagesModule, SharedModule } from '@lib';
import { GroupDetailsStore } from './store/group-details.store';
import { environment } from '../../../../environments/environment';
import { DbModel } from '@tscommon';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [SharedModule, PagesModule, EditModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss', 
  providers: [GroupDetailsStore]
})
export default class GroupDetailsComponent {
  readonly groupId = input.required<string>();

  readonly store = inject(GroupDetailsStore);
  readonly authStore = inject(AuthStore);

  readonly joinLink = computed(() => `${environment.appUrl}/join/${this.store.group()?.secret??''}`);
  readonly dashboardLink = computed(() => `${environment.dashboardUrl}/${this.store.group()?.secret??''}`);
  readonly loadCaption = computed(() => (this.store.group() === null)
    ? `Loading group ${this.groupId()}...`
    : `Saving...`);

  readonly blockingOptions = [
    { value: true, displayName: 'Blocked'}, 
    { value: false, displayName: 'Open'}
  ]

  readonly themeOptions = DbModel.COLOR_THEMES.map(theme => ({value: theme, displayName: theme}));


  constructor() {
    this.store.load(this.groupId);
  }

}
