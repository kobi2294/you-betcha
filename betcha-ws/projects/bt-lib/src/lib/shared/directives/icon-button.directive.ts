import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
    selector: 'mat-icon[libIconButton]', 
    standalone: true
})
export class IconButtonDirective {
    @Input()
    @HostBinding('class.disabled')
    disabled: boolean = false;

}