import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigDialogOutput, ConfirmDialogInput } from './confirm-dialog.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-confirm-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef) as MatDialogRef<ConfirmDialogComponent, ConfigDialogOutput>;
  readonly data = inject(MAT_DIALOG_DATA) as ConfirmDialogInput;

  defaults = {
    verifyText: '', 
    title: 'Confirm',
    message: 'Are you sure?',
    okLabel: 'OK',
    cancelLabel: 'Cancel'
  }

  readonly settings = { ...this.defaults, ...this.data };

  readonly ctrl = new FormControl('');

  get isOkEnabled() {
    return (!this.settings.verifyText) || ((this.ctrl.value?.trim()?.toLowerCase()??'') === this.settings.verifyText);
  }


  onCancel() {
    this.dialogRef.close({ ok: false });
  }

  onConfirm(){
    if (this.isOkEnabled) {
      this.dialogRef.close({ ok: true });
    }
  }
}
