import { Component, computed, inject } from '@angular/core';
import { GameStore } from '../../stores/game/game.store';
import { GameVm, PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export default class ScoresComponent {
  game = inject(GameStore);

  table = computed(() => this.game.vm().table);
  pointsLeft = computed(() => pointsLeftInGame(this.game.vm()));

}

function pointsLeftInGame(game: GameVm) {
  const inProgress = game.inProgressMatches
    .map(m => m.points)
    .reduce((a, b) => a + b, 0);

  const inFuture = game.futureMatches
    .map(m => m.points)
    .reduce((a, b) => a + b, 0);

  return inProgress + inFuture;
  
}
