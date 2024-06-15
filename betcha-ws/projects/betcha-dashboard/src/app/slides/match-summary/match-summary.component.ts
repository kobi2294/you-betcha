import { Component, computed, inject, input } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { StatsComponent } from "../../parts/stats/stats.component";
import { MatchComponent } from "../../parts/match/match.component";
import { MatchGuessesComponent } from "../../parts/match-guesses/match-guesses.component";
import { SharedModule } from '@lib';

@Component({
    selector: 'app-match-summary',
    standalone: true,
    templateUrl: './match-summary.component.html',
    styleUrl: './match-summary.component.scss',
    imports: [SharedModule, StatsComponent, MatchComponent, MatchGuessesComponent]
})
export class MatchSummaryComponent {
  readonly matchId = input.required<string>();

  readonly store = inject(DashboardStore);

  readonly match = computed(() => this.store.vm().pastMatches.find(m => m.id === this.matchId()));


}
