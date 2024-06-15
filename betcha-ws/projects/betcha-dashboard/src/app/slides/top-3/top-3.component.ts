import { Component, computed, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { PlayerComponent } from "../../parts/player/player.component";
import { PagesModule, SharedModule } from '@lib';

@Component({
    selector: 'app-top-3',
    standalone: true,
    templateUrl: './top-3.component.html',
    styleUrl: './top-3.component.scss',
    imports: [PlayerComponent, SharedModule, PagesModule]
})
export class Top3Component {
  readonly store = inject(DashboardStore);

  readonly top3 = computed(() => this.store.vm().table
    .sort((a, b) => b.displayName > a.displayName ? 1 : -1)
    .sort((a, b) => a.soloCount - b.soloCount)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3));

}
