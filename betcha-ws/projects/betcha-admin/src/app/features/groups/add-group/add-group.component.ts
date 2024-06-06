import { Component, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, NotificationsService, SharedModule } from '@lib';
import { Api } from '@tscommon';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss'
})
export default class AddGroupComponent {
  readonly router = inject(Router);
  readonly api = inject(ApiService);
  readonly notifications = inject(NotificationsService);

  form = inject(FormBuilder).group({
    groupId: ['', Validators.required], 
    name: ['', Validators.required],
  });

  async ok() {
    if (this.form.valid) {
      try {
        const data = this.form.value;
        const req: Api.CreateGroupRequest = {id: data.groupId!, displayName: data.name!};
        await firstValueFrom(this.api.createGroup(req));
        this.router.navigate(['groups', 'details', data.groupId!], {replaceUrl: true});  
      }
      catch (err: unknown) {
        this.notifications.error(err);

      }
    }

  }

  cancel() {
    this.router.navigate(['groups']);
  }



}
