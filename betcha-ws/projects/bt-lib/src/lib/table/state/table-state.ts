import { TemplateRef } from '@angular/core';
import { ColumnDefinition } from "../models/column-definition.model";
import { SortDirection } from '@angular/material/sort';
import { TrackBySelector } from '../models/track-by-selector.model';
import { RowKey } from '../models/row-key.model';
import { CellTemplateContext } from '../models/cell-template-context.model';
import { HeaderTemplateContext } from '../models/header-template-context.model';
import { ItemType } from '../../shared/models/item-type.model';

export const INIT_STATE: TableState = {
    data: [], 
    columns: [], 
    trackBy: t => t,
    cellTemplates: {}, 
    headerTemplates: {}, 
    sortColumn: '', 
    sortDirection: '', 
    selectedItemId: null, 
    selection: 'select', 
    sortable: true  
}

export type TableSelection = TableState['selection'];

export interface TableState {
    readonly data: ItemType[];
    readonly columns: ColumnDefinition<ItemType>[];
    readonly trackBy: TrackBySelector<ItemType>;
    readonly defaultCellTemplate?: TemplateRef<CellTemplateContext>;
    readonly cellTemplates: Record<string, TemplateRef<CellTemplateContext>>;
    readonly defaultHeaderTemplate?: TemplateRef<HeaderTemplateContext>;
    readonly headerTemplates: Record<string, TemplateRef<HeaderTemplateContext>>;
    readonly sortColumn: string;
    readonly sortDirection: SortDirection;
    readonly selectedItemId: RowKey | null;
    readonly selection: 'click' | 'select' | 'none';
    readonly sortable: boolean
}

export type InitTableState = Required<TableState>;

