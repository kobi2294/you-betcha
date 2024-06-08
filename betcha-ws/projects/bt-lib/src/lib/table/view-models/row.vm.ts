import { ItemType } from "../../shared/models/item-type.model";
import { RowKey } from "../models/row-key.model";
import { CellVm } from "./cell.vm";

export interface RowVm {
    readonly key: RowKey;
    readonly cells: CellVm[];
    readonly isSelected: boolean;
    readonly item: ItemType;
    readonly index: number;
}