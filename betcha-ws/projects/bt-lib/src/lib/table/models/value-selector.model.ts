import { ItemType } from "../../shared/models/item-type.model";

export type ValueSelector<T extends ItemType> =
  | ((t: T, index: number) => number)
  | ((t: T, index: number) => string);
