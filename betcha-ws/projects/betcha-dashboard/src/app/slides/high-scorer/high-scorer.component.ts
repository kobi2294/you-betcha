import { Component, computed, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { calcHighScorers } from './high-score.helper';
import { PagesModule, SharedModule } from '@lib';
import { PlayerComponent } from "../../parts/player/player.component";

@Component({
    selector: 'app-high-scorer',
    standalone: true,
    templateUrl: './high-scorer.component.html',
    styleUrl: './high-scorer.component.scss',
    imports: [SharedModule, PagesModule, PlayerComponent]
})
export class HighScorerComponent {
  readonly store = inject(DashboardStore);
  readonly highScorers = computed(() => calcHighScorers(this.store.calculatedGroup()!, this.store.vm()));



}
