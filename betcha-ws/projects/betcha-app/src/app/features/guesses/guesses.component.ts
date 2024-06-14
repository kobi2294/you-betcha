import { Component, inject } from '@angular/core';
import { SharedModule } from '@lib';
import { GuessesStore } from './store/guesses.store';
import { FutureMatchComponent } from "../../components/future-match/future-match.component";

@Component({
    selector: 'app-guesses',
    standalone: true,
    templateUrl: './guesses.component.html',
    styleUrl: './guesses.component.scss',
    providers: [GuessesStore],
    imports: [SharedModule, FutureMatchComponent]
})
export default class GuessesComponent {
  readonly store = inject(GuessesStore);

}
