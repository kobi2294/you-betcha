import { Component, effect, inject, input } from '@angular/core';
import { SharedModule } from '@lib';
import { GroupDetailsStore } from './store/group-details.store';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss', 
  providers: [GroupDetailsStore]
})
export default class GroupDetailsComponent {
  readonly store = inject(GroupDetailsStore);

  readonly groupId = input.required<string>();

  constructor() {
    this.store.load(this.groupId);
  }

}
