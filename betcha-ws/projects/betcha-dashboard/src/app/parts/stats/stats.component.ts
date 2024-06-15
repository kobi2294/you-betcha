import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  readonly home = input.required<number>();
  readonly tie = input.required<number>();
  readonly away = input.required<number>();

  readonly total = computed(() => this.home() + this.tie() + this.away());
  readonly homePercent = computed(() => (this.total() === 0) ? 0 : this.home() / this.total());
  readonly tiePercent = computed(() => (this.total() === 0) ? 0 : this.tie() / this.total());
  readonly awayPercent = computed(() => (this.total() === 0) ? 0 : this.away() / this.total());

  readonly homeName = input.required<string>();
  readonly awayName = input.required<string>();
  readonly gridTemplate = computed(() => `${this.home()}fr ${this.tie()}fr ${this.away()}fr`);


}
