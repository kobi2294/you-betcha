import { SortDirection } from '@angular/material/sort';
import { InitTableState, TableState } from "../state/table-state";
import { ColumnVm } from "../view-models/column.vm";
import { TableVm } from "../view-models/table.vm";
import { RowVm } from '../view-models/row.vm';
import { CellVm } from '../view-models/cell.vm';
import { RowKey } from '../models/row-key.model';
import { ItemType } from '../../shared/models/item-type.model';

const EMPTY_STATE: TableVm = {
    columns: [], 
    rows: [], 
    selectedKey: null, 
    selection: 'none', 
    sortable: false
}

export function isInitializedState(state: TableState): state is InitTableState {
    return !!state.defaultCellTemplate && !!state.defaultHeaderTemplate;
}

export function buildTableVm(state: TableState): TableVm {
    if (!isInitializedState(state)) return EMPTY_STATE;

    const columns = state.columns.map((_, index) => buildColumnVm(state, index));
    const sortedData = getSortedData(state);
    const rows = sortedData.map(item => buildRowVm(state, item.index));
    const selectedKey = state.selectedItemId;

    return {
        columns, 
        rows, 
        selectedKey, 
        selection: state.selection, 
        sortable: state.sortable
    }
}

type SortItem = {
    item: any, 
    index: number, 
    value: number | string
}

export function getSortedData(state: TableState): SortItem[] {
    const sortColDef = state.columns.find(c => c.id === state.sortColumn);

    if ((typeof(sortColDef) === 'undefined') || (typeof(sortColDef.value) === 'undefined')) {
        return state.data.map((item, index) => ({item, index, value: ''}));
    }


    const records: SortItem[] = state.data.map((item, index) => ({item, index, value: sortColDef.value!(item, index)}));

    const multiplier = (state.sortDirection === 'desc') ? -1 : 1;

    const compare: (a: SortItem, b: SortItem) => number = (a, b) => {
        if (a.value === b.value) return 0;
        if (a.value > b.value) return 1 * multiplier;
        return -1 * multiplier;
    }

    const sorted = state.sortable ? records.sort(compare) : records;
    return sorted;
}

export function buildColumnVm(state: InitTableState, index: number): ColumnVm {
    const coldef = state.columns[index];
    const id = coldef.id;
    const header = coldef.header ?? id;
    const template = state.headerTemplates[id] ?? state.defaultHeaderTemplate;
    const sortDirection: SortDirection = (state.sortColumn === id) ? state.sortDirection : '';
    const width: number = coldef.width ?? 100;
    const sortable: boolean = coldef.value !== undefined;

    return {
        id, 
        header, 
        template, 
        sortDirection, 
        width, 
        sortable
    }
}

export function buildRowVm(state: InitTableState, rowIndex: number): RowVm {
    const item = state.data[rowIndex];
    const key = state.trackBy(item, rowIndex);
    const isSelected = (state.selectedItemId === key);
    const cells = state.columns.map((_, index) => buildCellVm(state, rowIndex, index, item, key));

    return {
        key, 
        cells, 
        isSelected, 
        item, 
        index: rowIndex
    }
}

export function buildCellVm(state: InitTableState, rowIndex: number, columnIndex: number, item: ItemType, rowKey: RowKey): CellVm {
    const colDef = state.columns[columnIndex];
    const columnId = colDef.id;
    const value = (colDef.value === undefined) ? String(item) : colDef.value!(item, rowIndex);
    const template = state.cellTemplates[columnId] ?? state.defaultCellTemplate;
    const isRowSelected = (state.selectedItemId === rowKey);
    const width = colDef.width ?? 100;
    return {
        rowKey, 
        columnId, 
        value, 
        item, 
        template, 
        rowIndex, 
        isRowSelected, 
        width
    }
}