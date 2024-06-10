import { Component, inject } from '@angular/core';
import { MetadataStore } from '../../stores/metadata.store';
import { ApiService, SharedModule } from '@lib';
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

  async setGuess(matchId: string, guess: DbModel.GuessValue) {
    await firstValueFrom(this.api.setUserGuess(matchId, guess));

  }

}
