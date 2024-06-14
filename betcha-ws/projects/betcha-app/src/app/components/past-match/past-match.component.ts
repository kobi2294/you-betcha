import { Component, input } from '@angular/core';
import { PastMatchVm } from '@lib';
import { MatchBaseComponent } from "../match-base/match-base.component";
import { MatchStatsComponent } from "../match-stats/match-stats.component";
import { MatchDetailsComponent } from "../match-details/match-details.component";

@Component({
    selector: 'app-past-match',
    standalone: true,
    templateUrl: './past-match.component.html',
    styleUrl: './past-match.component.scss',
    imports: [MatchBaseComponent, MatchStatsComponent, MatchDetailsComponent]
})
export class PastMatchComponent {
  readonly match = input.required<PastMatchVm>();

}
