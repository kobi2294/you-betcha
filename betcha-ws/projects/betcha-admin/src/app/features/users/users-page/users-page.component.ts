import { Component, inject } from '@angular/core';
import { UsersPageStore } from './store/users-page.store';
import { AuthStore, EditModule, SelectionOption, SharedModule } from '@lib';
import { DbModel } from '@tscommon';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [SharedModule, EditModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  providers: [UsersPageStore]

})
export default class UsersPageComponent {
  readonly store = inject(UsersPageStore);
  readonly auth = inject(AuthStore);

  readonly roleOptions: SelectionOption[] = DbModel.USER_ROLES.map(role => ({value: role, displayName: role}));

}
