import { Component, input, output } from "@angular/core";

@Component({
    selector: 'sk-dialog-actions',
    templateUrl: './sk-dialog-actions.component.html',
    styleUrls: ['./sk-dialog-actions.component.scss']
})
export class SkDialogActionsComponent {
    readonly okLabel = input('Ok');
    readonly cancelLabel = input('Cancel');
    readonly okDisabled = input(false);
    readonly cancelDisabled = input(false);

    readonly ok = output();
    readonly cancel = output();


}