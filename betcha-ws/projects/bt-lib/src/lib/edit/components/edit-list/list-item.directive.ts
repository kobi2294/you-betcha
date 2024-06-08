import { Directive, TemplateRef } from "@angular/core";
import { ItemType } from "../../../shared/models/item-type.model";

export interface ListItemContext {
    $implicit: ItemType, 
    index: number,
}

@Directive({
    selector: '[libListItem]'
})
export class ListItemDirective {
    constructor(
        public template: TemplateRef<ListItemContext>
    ){}
}