import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[libEditPrefix]'
})
export class EditPrefixDirective {
    constructor(
        public template: TemplateRef<any>
    ){}
}