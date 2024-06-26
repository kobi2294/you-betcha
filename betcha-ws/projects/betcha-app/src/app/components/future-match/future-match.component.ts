import { Component, computed, input, output } from '@angular/core';
import { FutureMatchVm, PagesModule, SharedModule } from '@lib';
import { DbModel } from '@tscommon';
import { MatchBaseComponent } from "../match-base/match-base.component";

@Component({
    selector: 'app-future-match',
    standalone: true,
    templateUrl: './future-match.component.html',
    styleUrl: './future-match.component.scss',
    imports: [SharedModule, PagesModule, MatchBaseComponent]
})
export class FutureMatchComponent {
  match = input.required<FutureMatchVm>();
  guess = input.required<DbModel.GuessValue | null>();
  isKnockout = computed(() => this.match().stage.startsWith('group') === false);

  setGuess = output<DbModel.GuessValue>();

  

}
