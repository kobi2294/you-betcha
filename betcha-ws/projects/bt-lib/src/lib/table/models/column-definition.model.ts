import { ItemType } from "../../shared/models/item-type.model";
import { ValueSelector } from "./value-selector.model";

export interface ColumnDefinition<T extends ItemType> {
    readonly id: string;
    readonly header?: string;
    readonly value?: ValueSelector<T>;
    readonly width?: number;

}