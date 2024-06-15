import { Component, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { SharedModule } from '@lib';
import { flyDown, flyEnd, flyStart, flyStartEnd } from '../../models/animations';
import { ComingUpComponent } from "../../slides/coming-up/coming-up.component";
import { HighScorerComponent } from "../../slides/high-scorer/high-scorer.component";
import { Top3Component } from "../../slides/top-3/top-3.component";
import { NowPlayingComponent } from "../../slides/now-playing/now-playing.component";
import { MatchSummaryComponent } from "../../slides/match-summary/match-summary.component";

@Component({
    selector: 'app-slide-presenter',
    standalone: true,
    templateUrl: './slide-presenter.component.html',
    styleUrl: './slide-presenter.component.scss',
    animations: [
        flyStart,
        flyEnd,
        flyDown,
        flyStartEnd
    ],
    imports: [SharedModule, ComingUpComponent, HighScorerComponent, Top3Component, NowPlayingComponent, MatchSummaryComponent]
})
export class SlidePresenterComponent {
  readonly store = inject(DashboardStore);
}
