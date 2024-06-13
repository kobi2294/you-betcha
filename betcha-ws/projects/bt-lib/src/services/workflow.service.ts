import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfigDialogOutput, ConfirmDialogInput } from "../lib/standalones/confirm-dialog/confirm-dialog.model";
import { ConfirmDialogComponent } from "../lib/standalones/confirm-dialog/confirm-dialog.component";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkflowService {
    readonly matDialog = inject(MatDialog);

    confirm(data: ConfirmDialogInput): Observable<ConfigDialogOutput | undefined> {
        const ref = this.matDialog.open<ConfirmDialogComponent, ConfirmDialogInput, ConfigDialogOutput>(
            ConfirmDialogComponent, { data });

        return ref.afterClosed();
    }
}