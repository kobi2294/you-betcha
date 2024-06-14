import { Component, inject } from '@angular/core';
import { SharedModule } from '@lib';
import { HomeStore } from './store/home.store';
import { FutureMatchComponent } from "../../components/future-match/future-match.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [HomeStore],
    imports: [SharedModule, FutureMatchComponent]
})
export default class HomeComponent {
  readonly store = inject(HomeStore);
}
