import { TableState } from "../state/table-state";
import isEqual from "lodash.isequal";
import { TableVm } from "../view-models/table.vm";

export function areTableStatesEqual(s1: TableState, s2: TableState): boolean {
    return (s1.defaultCellTemplate === s2.defaultCellTemplate)
     && (s1.defaultHeaderTemplate === s2.defaultHeaderTemplate)
     && (isEqual(s1.columns, s2.columns))
     && (isEqual(s1.data, s2.data))
     && (isEqual(s1.selectedItemId, s2.selectedItemId))
     && (isEqual(s1.sortColumn, s2.sortColumn))
     && (isEqual(s1.sortDirection, s2.sortDirection))
     && (s1.trackBy === s2.trackBy)
}

export function areTableVmsEqual(s1: TableVm, s2: TableVm): boolean {
    return isEqual(s1, s2);
}