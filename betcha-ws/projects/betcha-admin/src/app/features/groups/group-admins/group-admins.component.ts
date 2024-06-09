import { Component, computed, inject, input } from '@angular/core';
import { GroupDetailsStore } from '../group-details/store/group-details.store';
import { EditModule, PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-group-admins',
  standalone: true,
  imports: [SharedModule, PagesModule, EditModule],
  templateUrl: './group-admins.component.html',
  styleUrl: './group-admins.component.scss', 
})
export default class GroupAdminsComponent {
  readonly store = inject(GroupDetailsStore);
  readonly groupId = input.required<string>();

  readonly loadCaption = computed(() => (this.store.group() === null)
  ? `Loading group ${this.groupId()}...`
  : `Saving...`);
  
  constructor() {
    this.store.load(this.groupId);
  }
}
