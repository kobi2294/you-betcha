import { Component, computed, inject, input } from '@angular/core';
import { Solo } from '../../models/slide.model';
import { MatchComponent } from '../../parts/match/match.component';
import { SharedModule } from '@lib';
import { PlayerComponent } from "../../parts/player/player.component";
import { DashboardStore } from '../../store/dashboard.store';

@Component({
    selector: 'app-solo',
    standalone: true,
    templateUrl: './solo.component.html',
    styleUrl: './solo.component.scss',
    imports: [MatchComponent, SharedModule, PlayerComponent]
})
export class SoloComponent {  
  readonly solo = input.required<Solo>();

  readonly store = inject(DashboardStore);

  readonly match = computed(() => this.store.vm().pastMatches.find(m => m.id === this.solo().matchId));

}
