import { Component, computed, inject, input } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';

@Component({
  selector: 'lib-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.scss'
})
export class ProfilePicComponent {
  store = inject(AuthStore);

  url = input<string | undefined>(undefined);

  effectiveUrl = computed(() => this.calcEffectiveUrl());


  calcEffectiveUrl(): string {
    let res = this.url();
    if (res === undefined) {
      res = this.store.user()?.photoUrl;
    }

    if ((res === undefined) || (res.trim() === '')) {
      return 'assets/images/guest.png';
    }
    return res;
  }

}
