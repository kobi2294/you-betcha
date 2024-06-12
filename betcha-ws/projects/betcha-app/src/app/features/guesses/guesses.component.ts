import { Component, inject } from '@angular/core';
import { MetadataStore } from '../../stores/metadata.store';
import { ApiService, NotificationsService, SharedModule } from '@lib';
import { DbModel } from '@tscommon';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-guesses',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './guesses.component.html',
  styleUrl: './guesses.component.scss'
})
export default class GuessesComponent {
  readonly store = inject(MetadataStore);
  readonly api = inject(ApiService);
  readonly notify = inject(NotificationsService);

  async setGuess(matchId: string, guess: DbModel.GuessValue) {
    try {
      await firstValueFrom(this.api.setUserGuess(matchId, guess));
    }
    catch (err) {
      this.notify.error(err);
    }
  }

}
