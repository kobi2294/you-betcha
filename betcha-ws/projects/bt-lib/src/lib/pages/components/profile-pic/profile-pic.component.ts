import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth.store';

@Component({
  selector: 'lib-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.scss'
})
export class ProfilePicComponent {
  store = inject(AuthStore);

}
