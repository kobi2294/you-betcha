import { Component, Input, Output, EventEmitter, TrackByFunction } from '@angular/core';
import { RowVm } from '../../view-models/row.vm';
import { ColumnVm } from '../../view-models/column.vm';

@Component({
  selector: 'lib-data-row',
  templateUrl: './data-row.component.html',
  styleUrls: ['./data-row.component.scss']
})
export class DataRowComponent {
  @Input()
  row!: RowVm;

  @Output()
  selection = new EventEmitter();

  trackByColId: TrackByFunction<ColumnVm> = (index, col) => col.id;

}
