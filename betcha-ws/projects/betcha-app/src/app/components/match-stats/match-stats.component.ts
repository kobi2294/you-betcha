import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-match-stats',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './match-stats.component.html',
  styleUrl: './match-stats.component.scss'
})
export class MatchStatsComponent {
  readonly homeName = input.required<string>();
  readonly awayName = input.required<string>();

  readonly home = input.required<number>();
  readonly away = input.required<number>();
  readonly tie = input.required<number>();

  readonly total = computed(() => this.home() + this.away() + this.tie());
  readonly homePercent = computed(() => this.total() > 0 ? this.home() / this.total() : 0);
  readonly awayPercent = computed(() => this.total() > 0 ? this.away() / this.total() : 0);
  readonly tiePercent = computed(() => this.total() > 0 ? this.tie() / this.total() : 0);

  readonly gridTemplate = computed(() => `${this.home()}fr ${this.tie()}fr ${this.away()}fr`);


}
