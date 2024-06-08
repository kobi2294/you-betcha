import { ItemType } from "../../shared/models/item-type.model";

export interface CellTemplateContext {
    readonly $implicit: number | string | null;
    readonly item: ItemType;
}