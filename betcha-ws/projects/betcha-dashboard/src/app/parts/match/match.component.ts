import { Component, computed, input } from '@angular/core';
import { PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {

  readonly home = input.required<string>();
  readonly away = input.required<string>();

  readonly homeScore = input<number | null>(null);
  readonly awayScore = input<number | null>(null);
  readonly hasScore = computed(() => this.homeScore() !== null && this.awayScore() !== null);
}

