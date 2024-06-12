import { Component, inject } from '@angular/core';
import { ApiService, NotificationsService, SharedModule } from '@lib';
import { DbModel } from '@tscommon';
import { firstValueFrom } from 'rxjs';
import { GameStore } from '../../stores/game/game.store';
import { GuessesStore } from './store/guesses.store';

@Component({
  selector: 'app-guesses',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './guesses.component.html',
  styleUrl: './guesses.component.scss', 
  providers: [GuessesStore],
})
export default class GuessesComponent {
  readonly store = inject(GuessesStore);

}
