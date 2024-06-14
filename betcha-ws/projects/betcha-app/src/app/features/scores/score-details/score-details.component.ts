import { Component, computed, inject } from '@angular/core';
import { GameStore } from '../../../stores/game/game.store';
import { PastMatchComponent } from "../../../components/past-match/past-match.component";

@Component({
    selector: 'app-score-details',
    standalone: true,
    templateUrl: './score-details.component.html',
    styleUrl: './score-details.component.scss',
    imports: [PastMatchComponent]
})
export default class ScoreDetailsComponent {
  readonly store = inject(GameStore);

  readonly matches = computed(() => this.store.vm().pastMatches.sort((a, b) => b.dateValue - a.dateValue));


}
