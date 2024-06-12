import { Component, Signal, computed, inject } from '@angular/core';
import { MatchesStore } from './store/matches.store';
import { EditModule, PagesModule, SelectionOption, SharedModule } from '@lib';
import { toRecord } from '@tscommon';

@Component({
  selector: 'app-matches-page',
  standalone: true,
  imports: [SharedModule, PagesModule, EditModule],
  templateUrl: './matches-page.component.html',
  styleUrl: './matches-page.component.scss',
  providers: [MatchesStore]
})
export default class MatchesPageComponent {
  readonly store = inject(MatchesStore);

  readonly scoreOptions: SelectionOption[] = [
    { value: null, displayName: '-'},
    { value: 0, displayName: '0' },
    { value: 1, displayName: '1' },
    { value: 2, displayName: '2' },
    { value: 3, displayName: '3' },
    { value: 4, displayName: '4' },
    { value: 5, displayName: '5' }, 
    { value: 6, displayName: '6' },
    { value: 7, displayName: '7' },
    { value: 8, displayName: '8' },
  ]

  readonly stageMap = computed(() => toRecord(this.store.stages(), s => s.id))

  readonly countryOptions: Signal<SelectionOption[]> = computed(() => 
    [{value: null, displayName: '---'}, 
      ... this.store.countries().map(
        cntr => ({ value: cntr, displayName: cntr })
    )]);
}
