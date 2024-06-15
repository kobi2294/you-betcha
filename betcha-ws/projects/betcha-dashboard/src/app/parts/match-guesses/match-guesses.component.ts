import { Component, input } from '@angular/core';
import { SharedModule } from '@lib';
import { DbModel } from '@tscommon';

@Component({
  selector: 'app-match-guesses',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './match-guesses.component.html',
  styleUrl: './match-guesses.component.scss'
})
export class MatchGuessesComponent {
  readonly home = input.required<number>();
  readonly away = input.required<number>();
  readonly tie = input.required<number>();
  readonly score = input.required<DbModel.GuessValue>();

}
