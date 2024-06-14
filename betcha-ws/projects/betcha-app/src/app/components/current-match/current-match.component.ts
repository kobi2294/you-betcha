import { Component, input } from '@angular/core';
import { InProgressMatchVm } from '@lib';
import { MatchBaseComponent } from "../match-base/match-base.component";
import { MatchStatsComponent } from "../match-stats/match-stats.component";

@Component({
    selector: 'app-current-match',
    standalone: true,
    templateUrl: './current-match.component.html',
    styleUrl: './current-match.component.scss',
    imports: [MatchBaseComponent, MatchStatsComponent]
})
export class CurrentMatchComponent {
  readonly match = input.required<InProgressMatchVm>();

}
