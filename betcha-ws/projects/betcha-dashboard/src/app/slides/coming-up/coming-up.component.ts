import { Component, computed, inject, input } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { SharedModule, comingUp } from '@lib';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-coming-up',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './coming-up.component.html',
  styleUrl: './coming-up.component.scss'
})
export class ComingUpComponent {
  readonly store = inject(DashboardStore);
  readonly matchId = input.required<string>();

  readonly now = toSignal(interval(1000)
    .pipe(map(() => Date.now()), takeUntilDestroyed()), { initialValue: Date.now()});


  readonly match = computed(() => this.store.vm().nextMacthes.find(match => match.id === this.matchId()));

  readonly coming = computed(() => comingUp([this.match()!], this.now()));

}
