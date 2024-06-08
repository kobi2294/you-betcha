import { Component, computed, effect, inject, input } from '@angular/core';
import { EditModule, PagesModule, SharedModule } from '@lib';
import { GroupDetailsStore } from './store/group-details.store';
import { environment } from '../../../../environments/environment';

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

  readonly joinLink = computed(() => `${environment.appUrl}/join/${this.store.group()?.secret??''}`);
  readonly dashboardLink = computed(() => `${environment.dashboardUrl}/groups/${this.store.group()?.secret??''}`);
  readonly loadCaption = computed(() => `Loading group ${this.groupId()}...`);


  constructor() {
    this.store.load(this.groupId);
  }

}
