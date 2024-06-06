import { Component, inject } from '@angular/core';
import { GroupsPageStore } from './store/groups-page.store';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.scss',
  providers: [GroupsPageStore],
})
export default class GroupsPageComponent {
  store = inject(GroupsPageStore);
}
