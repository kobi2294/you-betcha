import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, SharedModule } from '@lib';
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
        this.router.navigate(['groups', 'details', data.groupId!]);  
      }
      catch (err) {
        console.error(err);
      }
    }

  }

  cancel() {
    this.router.navigate(['groups']);
  }



}
