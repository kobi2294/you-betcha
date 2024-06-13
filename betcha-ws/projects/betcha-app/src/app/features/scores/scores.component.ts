import { Component, computed, inject } from '@angular/core';
import { GameStore } from '../../stores/game/game.store';
import { PagesModule, SharedModule } from '@lib';

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

}
