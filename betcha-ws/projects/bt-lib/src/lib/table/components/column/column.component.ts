import { Component, Input, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { TableCellDirective } from '../../directives/table-cell.directive';
import { TableStore } from '../../table-store.service';
import { TableHeaderDirective } from '../../directives/table-header.directive';

@Component({
  selector: 'lib-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input()
  id: string = '';

  @ContentChild(TableCellDirective)
  set tableCellDirective(value: TableCellDirective | null) {
    const template = value?.template ?? null;
    this.store.setCellTemplate(this.id, template);
  }

  @ContentChild(TableHeaderDirective)
  set TableHeaderDirective(value: TableHeaderDirective | null) {
    const template = value?.template ?? null;
    this.store.setHeaderTemplate(this.id, template);
  }

  constructor(private store: TableStore) { }

  ngOnInit(): void {
  }

}

