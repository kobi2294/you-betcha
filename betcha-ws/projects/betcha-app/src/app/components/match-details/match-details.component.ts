import { Component, Signal, computed, input, signal } from '@angular/core';
import { SharedModule, UserGuess, UserScore } from '@lib';
import { DbModel } from '@tscommon';

@Component({
  selector: 'app-match-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.scss',
})
export class MatchDetailsComponent {
  readonly records = input.required<UserGuess[] | UserScore[]>();
  readonly score = input.required<DbModel.GuessValue | null>();

  readonly completed = computed(() => this.score() !== null); 
  readonly stats = input<DbModel.MatchStatistics | null>()
  readonly pointsEach = input(0);

  readonly vms: Signal<UserScore[]> = computed(() =>
    this.records().map((r) =>
      isUserScore(r)
        ? r
        : {
            ...r,
            points: 0,
            isCorrect: false,
            isSolo: false,
          }
    )
    .sort((a, b) => (b.displayName > a.displayName ? -1 : 1))
    .sort((a, b) => (b.points - a.points))
  );

 
  readonly many = computed(() => this.records().length > 5);
  readonly expanded = signal(false);
}

function isUserScore(record: UserGuess | UserScore): record is UserScore {
  return (record as UserScore).points !== undefined;
}
