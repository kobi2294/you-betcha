import { RowKey } from "../models/row-key.model";
import { TableSelection } from "../state/table-state";
import { ColumnVm } from "./column.vm";
import { RowVm } from "./row.vm";

export interface TableVm {
    readonly columns: ColumnVm[];
    readonly rows: RowVm[];
    readonly selectedKey: RowKey | null;
    readonly selection: TableSelection;
    readonly sortable: boolean;

}