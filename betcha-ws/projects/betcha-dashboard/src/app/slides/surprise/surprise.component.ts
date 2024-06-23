import { Component, computed, inject, input } from '@angular/core';
import { Surprise } from '../../models/slide.model';
import { MatchComponent } from "../../parts/match/match.component";
import { DashboardStore } from '../../store/dashboard.store';
import { StatsComponent } from "../../parts/stats/stats.component";
import { PlayerComponent } from "../../parts/player/player.component";
import { SharedModule } from '@lib';

@Component({
    selector: 'app-surprise',
    standalone: true,
    templateUrl: './surprise.component.html',
    styleUrl: './surprise.component.scss',
    imports: [MatchComponent, StatsComponent, PlayerComponent, SharedModule]
})
export class SurpriseComponent {
  readonly surprise = input.required<Surprise>();
  readonly store = inject(DashboardStore);

  readonly match = computed(() => this.store.vm().pastMatches.find(m => m.id === this.surprise().matchId));

}
