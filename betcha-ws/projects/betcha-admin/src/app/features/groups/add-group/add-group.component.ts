import { Component, inject, signal } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, NotificationsService, SharedModule } from '@lib';
import { Api } from '@tscommon';
import { delay, firstValueFrom } from 'rxjs';

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
  readonly busy = signal(false);

  form = inject(FormBuilder).group({
    groupId: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9-]+$/), Validators.minLength(5)], ], 
    name: ['', Validators.required],
  });

  groupId = this.form.get('groupId')!;
  name = this.form.get('name')!;


  async ok() {
    if (this.form.valid) {
      try {
        this.busy.set(true);
        await new Promise(resolve => setTimeout(resolve, 20000));
        const data = this.form.value;
        const req: Api.CreateGroupRequest = {id: data.groupId!, displayName: data.name!};
        await firstValueFrom(this.api.createGroup(req));
        this.router.navigate(['groups', 'details', data.groupId!], {replaceUrl: true});  
      }
      catch (err: unknown) {
        this.notifications.error(err);
      }
      finally{
        this.busy.set(false);
      }
    }

  }

  cancel() {
    this.router.navigate(['groups']);
  }



}
