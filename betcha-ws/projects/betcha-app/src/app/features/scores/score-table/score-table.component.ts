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
  pointsLeft = computed(() => this.game.vm().pointsLeft);

}

