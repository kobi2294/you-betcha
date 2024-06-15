import { Component, computed, inject, input } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { MatchComponent } from "../../parts/match/match.component";
import { StatsComponent } from "../../parts/stats/stats.component";

@Component({
    selector: 'app-now-playing',
    standalone: true,
    templateUrl: './now-playing.component.html',
    styleUrl: './now-playing.component.scss',
    imports: [MatchComponent, StatsComponent]
})
export class NowPlayingComponent {
  readonly store = inject(DashboardStore);

  readonly matchId = input.required<string>();

  readonly match = computed(() => this.store.vm().inProgressMatches.find(m => m.id === this.matchId()));

}
