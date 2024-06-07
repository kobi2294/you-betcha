import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-busy',
  templateUrl: './busy.component.html',
  styleUrl: './busy.component.scss'
})
export class BusyComponent {
  readonly busy = input.required<boolean>();
  readonly caption = input('Please wait...');

}
