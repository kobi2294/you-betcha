import { TemplateRef } from '@angular/core';
import { RowKey } from '../models/row-key.model';
import { CellTemplateContext } from '../models/cell-template-context.model';
import { ItemType } from '../../shared/models/item-type.model';
export interface CellVm {
    readonly rowKey: RowKey;
    readonly columnId: string;
    readonly value: string | number;
    readonly item: ItemType;
    readonly template: TemplateRef<CellTemplateContext>;
    readonly rowIndex: number;
    readonly isRowSelected: boolean;
    readonly width: number;

}