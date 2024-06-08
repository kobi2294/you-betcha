import { Component, Input, OnInit } from '@angular/core';
import { SortDirection } from '@angular/material/sort';

@Component({
  selector: 'lib-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.scss']
})
export class SortArrowComponent implements OnInit {
  @Input()
  direction: SortDirection = '';

  constructor() { }

  ngOnInit(): void {
  }

}
