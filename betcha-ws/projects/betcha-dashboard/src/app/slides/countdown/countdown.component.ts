import { Component, computed, inject, input, signal } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { FutureMatchVm, GameVm, InProgressMatchVm, SharedModule } from '@lib';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatchComponent } from "../../parts/match/match.component";
import { blurOut } from '../../models/animations';

@Component({
    selector: 'app-countdown',
    standalone: true,
    templateUrl: './countdown.component.html',
    styleUrl: './countdown.component.scss',
    imports: [MatchComponent, SharedModule], 
    animations: [blurOut]
})
export class CountdownComponent {
  readonly store = inject(DashboardStore);
  readonly matches = input.required<FutureMatchVm[]>();

  readonly seconds = signal(60);
  readonly counter = computed(() => (this.seconds() > 0) ? this.seconds() : 'GO!');
  readonly message = computed(() => (this.seconds() > 0) ? 'Last chance to guess' : 'Good luck!');

  constructor() {
    const trigger$ = interval(100).pipe(takeUntilDestroyed());
    trigger$.subscribe(() => {
      this.seconds.set(secondsToGo(this.matches()[0]));
    });
  }
}

function secondsToGo(match: FutureMatchVm): number {
  return Math.max(0, Math.floor((match.dateValue - Date.now()) / 1000));
}

