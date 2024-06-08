import { Subject, tap } from 'rxjs';
import { Component, Input, OnInit, ViewChild, TemplateRef, TrackByFunction, Output, AfterViewInit } from '@angular/core';
import { ColumnDefinition } from './models/column-definition.model';
import { TableStore } from './table-store.service';
import { TrackBySelector } from './models/track-by-selector.model';
import { CellTemplateContext } from './models/cell-template-context.model';
import { HeaderTemplateContext } from './models/header-template-context.model';
import { ColumnVm } from './view-models/column.vm';
import { RowKey } from './models/row-key.model';
import { map, distinctUntilChanged, debounceTime } from 'rxjs';
import { RowVm } from './view-models/row.vm';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableSelection } from './state/table-state';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'], 
  providers: [TableStore]
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input()
  set data(value: any[] | null) {
    this.store.setData(value ?? []);
  }

  @Input()
  set columns(value : ColumnDefinition<any>[]) {
    this.store.setColumns(value);
  }

  @Input() 
  set trackBy(value: TrackBySelector<any>) {
    this.store.setTrackBy(value);
  }

  @Input()
  set selected(value: RowKey | null) {
    if (value === null) {
      this.store.clearSelected();
    } else {
      this.store.setSelected(value);
      this.scrollNow$.next();
    }
  }
  get selected(): RowKey | null {
    return this.store.state.selectedItemId;
  }

  @Input()
  get selection(): TableSelection {
    return this.store.state.selection;
  }
  set selection(value: TableSelection) {
    this.store.setSelection(value);
  } 

  @Input() 
  set sortable(value: boolean) {
    this.store.setSortable(value)
  }
  get sortable(): boolean {
    return this.store.state.sortable;
  }

  

  @Output()
  selectionChanged = this.store.state$.pipe(
    map(state => state.selectedItemId), 
    distinctUntilChanged(), 
    debounceTime(0)
  );

  @ViewChild('defaultCellTemplate', {read: TemplateRef})
  set defaultCellTemplate(value: TemplateRef<CellTemplateContext>){
    this.store.setDefaultCellTemplate(value);
  }

  @ViewChild('defaultHeaderTemplate', {read: TemplateRef})
  set defaultHeaderTemplate(value: TemplateRef<HeaderTemplateContext>) {
    this.store.setDefaultHeaderTemplate(value);
  }

  @ViewChild(CdkVirtualScrollViewport)
  private virtualViewport!: CdkVirtualScrollViewport;

  protected vm$ = this.store.vm$;
  public readonly state$ = this.store.state$;
  protected scrollNow$ = new Subject<void>();

  constructor(public readonly store: TableStore) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    for (let index = 0; index < 5; index++) {
      await new Promise(res => setTimeout(res, (index * 10) + 10));
      this.virtualViewport.checkViewportSize();        
    }
  }


  toggleSort(col: ColumnVm) {
    if (!this.sortable) {
      return;
    }
    if (col.sortable) {
      this.store.toggleSort(col.id);
    }
  }

  toggleSelection(rowKey: RowKey) {
    this.store.toggleSelection(rowKey);
    this.scrollNow$.next();
  }

  trackByColId: TrackByFunction<ColumnVm> = (index, col) => col.id;

  trackByRowKey: TrackByFunction<RowVm> = (index, row) => row.key;

}
