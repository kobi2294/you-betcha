import { ItemType } from "../../shared/models/item-type.model";

export type TrackBySelector<T extends ItemType> = 
      | ((t: T, index: number) => number)
      | ((t: T, index: number) => string)
      | ((t: T, index: number) => T);
      
