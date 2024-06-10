import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'lib-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  readonly name = input.required<string>();
}
