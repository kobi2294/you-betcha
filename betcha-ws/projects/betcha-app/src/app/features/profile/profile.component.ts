import { Component, inject, signal } from '@angular/core';
import { ApiService, AuthStore, EditModule, NotificationsService, PagesModule, SharedModule } from '@lib';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, PagesModule, EditModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {
  readonly store = inject(AuthStore);
  readonly api = inject(ApiService);
  readonly notif = inject(NotificationsService)

  readonly busy = signal(false);


  async uploadPhoto(file: File) {
    try {
      this.busy.set(true);
      await firstValueFrom(this.api.uploadUserProfileImage(this.store.user()!.id, file));
      this.notif.success('Profile photo updated', 'Ok');
    } catch (e) {
      this.notif.error('Failed to update profile photo'); 
    } finally {
      this.busy.set(false);
    }
  }

  async updateDisplayName(name: string) {
    try {
      this.busy.set(true);
      await firstValueFrom(this.api.setUserDisplayName(name));
      this.notif.success('Display name updated', 'Ok');
    } catch (e) {
      this.notif.error('Failed to update display name'); 
    } finally {
      this.busy.set(false);
    }
  }

}
