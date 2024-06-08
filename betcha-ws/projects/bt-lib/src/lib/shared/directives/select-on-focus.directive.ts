import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: 'input[select-on-focus]',
    standalone: true
})
export class SelectOnFocusDirective {
    @HostListener('focus')
    onFocus() {
        this.elem.nativeElement.select();
    }

    constructor(private elem: ElementRef<HTMLInputElement>) {}

}