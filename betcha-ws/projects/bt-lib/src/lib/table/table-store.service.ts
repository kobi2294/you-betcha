import { INIT_STATE, TableSelection, TableState } from './state/table-state';
import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { ColumnDefinition } from './models/column-definition.model';
import { TrackBySelector } from './models/track-by-selector.model';
import { CellTemplateContext } from './models/cell-template-context.model';
import { HeaderTemplateContext } from './models/header-template-context.model';
import { BehaviorSubject, map, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { RowKey } from './models/row-key.model';
import { buildTableVm } from './helpers/view-model.helpers';
import { calcNewSort, setRecord } from './helpers/reducer-helpers';
import { areTableStatesEqual, areTableVmsEqual } from './helpers/compare-helpers';

@Injectable()
export class TableStore implements OnDestroy {
  private _state$ = new BehaviorSubject<TableState>(INIT_STATE);

  readonly state$ = this._state$.pipe(
    distinctUntilChanged(areTableStatesEqual)
  )

  get state() {
    return this._state$.value;
  }

  readonly vm$ = this.state$.pipe(
    map(state => buildTableVm(state)), 
    distinctUntilChanged(areTableVmsEqual),
    debounceTime(0)
    );

  constructor() {}

  ngOnDestroy(): void {
    this._state$.complete();
  }

  private updateState(reducer: (oldState: TableState) => TableState) {
    const newState = reducer(this._state$.value);
    this._state$.next(newState);
  }

  setData(value: Object[]) {
    this.updateState((state) => ({
      ...state,
      data: value,
    }));
  }

  setSelection(value: TableSelection) {
    this.updateState(state => ({
      ...state, 
      selection: value
    }))
  }

  setSortable(value: boolean) {
    this.updateState(state => ({
      ...state, 
      sortable: value
    }))
  }

  setColumns(value: ColumnDefinition<Object>[]) {
    this.updateState((state) => ({
      ...state,
      columns: value,
    }));
  }

  setTrackBy(value: TrackBySelector<Object>) {
    this.updateState((state) => ({
      ...state,
      trackBy: value,
    }));
  }

  setDefaultCellTemplate(value: TemplateRef<CellTemplateContext>) {
    this.updateState((state) => ({
      ...state,
      defaultCellTemplate: value,
    }));
  }

  setDefaultHeaderTemplate(value: TemplateRef<HeaderTemplateContext>) {
    this.updateState((state) => ({
      ...state,
      defaultHeaderTemplate: value,
    }));
  }

  setCellTemplate(id: string, value: TemplateRef<CellTemplateContext> | null) {
    this.updateState((state) => ({
      ...state,
      cellTemplates: setRecord(state.cellTemplates, id, value),
    }));
  }

  setHeaderTemplate(
    id: string,
    value: TemplateRef<HeaderTemplateContext> | null
  ) {
    this.updateState((state) => ({
      ...state, 
      headerTemplates: setRecord(state.headerTemplates, id, value)
    }))
  }

  toggleSort(id: string) {
    this.updateState((state) => {
      const newSort = calcNewSort({column: state.sortColumn, direction: state.sortDirection}, id);
      return {
        ...state, 
        sortColumn: newSort.column, 
        sortDirection: newSort.direction
      }
    });
  }

  clearSort() {
    this.updateState((state) => ({
      ...state, 
      sortColumn: '', 
      sortDirection: 'asc'
    }))
  }

  toggleSelection(key: RowKey) {
    this.updateState((state) => ({
      ...state, 
      selectedItemId: (state.selectedItemId === key) ? null : key
    }))
  }

  setSelected(key: RowKey) {
    this.updateState(state => ({
      ...state, 
      selectedItemId: key
    }))
  }

  clearSelected() {
    this.updateState(state => ({
      ...state, 
      selectedItemId: null
    }))
  }
}
