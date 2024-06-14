import { Component, input, output } from '@angular/core';
import { FutureMatchVm, PagesModule, SharedModule } from '@lib';
import { DbModel } from '@tscommon';

@Component({
  selector: 'app-future-match',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './future-match.component.html',
  styleUrl: './future-match.component.scss'
})
export class FutureMatchComponent {
  match = input.required<FutureMatchVm>();
  guess = input.required<DbModel.GuessValue | null>();

  setGuess = output<DbModel.GuessValue>();

  

}
