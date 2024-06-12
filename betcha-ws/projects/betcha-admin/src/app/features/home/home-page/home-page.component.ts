import { Component, inject, signal } from '@angular/core';
import { ApiService, AuthStore, NotificationsService, SharedModule } from '@lib';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent {
    readonly authStore = inject(AuthStore);
    readonly api = inject(ApiService);
    readonly notifications = inject(NotificationsService);

    readonly busy = signal(false);

    async resetAllCalculatedGroups() {
      this.busy.set(true);
      try {
        await firstValueFrom(this.api.resetCalculatedGroups());
        this.notifications.success('All calculated groups have been reset', 'Ok');
      }
      catch (err) {
        console.error(err);
        this.notifications.error(err);
      }
      finally {
        this.busy.set(false);
      }
    }

    async calculateForMatches() {
      this.busy.set(true);
      try {
        await firstValueFrom(this.api.calculateForMatches());
        this.notifications.success('Calculations completed', 'Ok');
      }
      catch (err) {
        console.error(err);
        this.notifications.error(err);
      }
      finally {
        this.busy.set(false);
      }
    }

    async resetAllMatchCalculations() {
      this.busy.set(true);
      try {
        await firstValueFrom(this.api.resetAllMatchCalculations());
        this.notifications.success('All match calculations have been reset', 'Ok');
      }
      catch (err) {
        console.error(err);
        this.notifications.error(err);
      }
      finally {
        this.busy.set(false);
      }
    }

}
