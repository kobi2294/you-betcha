import { Component, computed, inject } from '@angular/core';
import { GameStore } from '../../../stores/game/game.store';
import { GameVm, PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-score-table',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.scss'
})
export default class ScoreTableComponent {
  game = inject(GameStore);

  table = computed(() => this.game
    .vm()
    .table
    .sort((a, b) => (b.totalPoints * 100 + b.soloCount) - (a.totalPoints * 100 + a.soloCount)));
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
