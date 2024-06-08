import { Directive, TemplateRef, inject } from "@angular/core";
import { SelectionOption } from "./edit-select.component";

export interface OptionTemplateContext {
    $implicit: SelectionOption;

}

@Directive({
    selector: '[libOption]',
})
export class OptionTemplateDirective {
    readonly template = inject(TemplateRef<OptionTemplateContext>);
}