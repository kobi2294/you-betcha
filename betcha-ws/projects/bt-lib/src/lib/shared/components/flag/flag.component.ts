import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lib-flag',
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss'
})
export class FlagComponent {
  readonly country = input.required<string>();

  readonly imageUrl = computed(() => `assets/flags/${this.country()}.svg`);

}
