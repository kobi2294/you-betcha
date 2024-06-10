import { Component, inject } from '@angular/core';
import { MetadataStore } from '../../stores/metadata.store';
import { SharedModule } from '@lib';
import { DbModel } from '@tscommon';

@Component({
  selector: 'app-guesses',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './guesses.component.html',
  styleUrl: './guesses.component.scss'
})
export default class GuessesComponent {
  readonly store = inject(MetadataStore);

  setGuess(matchId: string, guess: DbModel.GuessValue) {
    

  }

}
