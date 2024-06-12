import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lib-flag',
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss'
})
export class FlagComponent {
  readonly country = input.required<string | null>();

  readonly imageUrl = computed(() => (this.country() !== null) 
    ? `assets/flags/${this.country()}.svg`
    : `assets/images/fallback.svg`
  );

}
