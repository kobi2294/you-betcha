import { Directive, inject, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Directive({
    standalone: true,
    selector: 'mat-icon[symbol]'
})
export class MatIconSymbolDirective {
    matIcon = inject(MatIcon);

    readonly symbol = input<any>();


    constructor() {
        this.matIcon.fontSet = 'material-symbols-outlined'
    }
}