import { Component, computed, inject } from '@angular/core';
import { ApiService, AuthStore, PagesModule, SharedModule, WorkflowService } from '@lib';
import { GroupDetailsStore } from '../group-details/store/group-details.store';
import { toRecord } from '@tscommon';
import { buildUsersVm } from './group-users.vm';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-group-users',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './group-users.component.html',
  styleUrl: './group-users.component.scss'
})
export default class GroupUsersComponent {
  readonly store = inject(GroupDetailsStore);
  readonly workflow = inject(WorkflowService);
  readonly api = inject(ApiService);
  readonly auth = inject(AuthStore);

  readonly vm = computed(() => buildUsersVm(this.store.members(), this.store.group()?.admins || []));

  async removeUser(userId: string) {
    const result = await firstValueFrom(this.workflow.confirm({
      title: 'Remove User From Group',
      message: 'Please confirm that you want to remove this user from the group.', 
      verifyText: this.store.groupId(), 
      cancelLabel: 'Cancel', 
      okLabel: 'Remove From Group'    
    }));

    if (result && result.ok) {
      this.store.removeUser(userId);
    }

  }

  toggleAdmin(id: string) {
    const group = this.store.group();
    if (!group) return;
    const isAdmin = group.admins.includes(id);
    if (isAdmin) {
      this.store.removeAdmin(id);
    } else {
      this.store.addAdmin(id);
    }
      
  }


}
