import { Injectable, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private snackbar = inject(MatSnackBar);

  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  error(err: unknown) {
    if (err instanceof FirebaseError) {
      this.openSnackBar(err.message, '', 'error-snackbar');
    } else if (typeof err === 'string') {
      this.openSnackBar(err, '', 'error-snackbar');
    } else {
      this.openSnackBar(`${err}`, '', 'error-snackbar');
    }
  }

  private openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 3000
  ) {
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: [className],
      verticalPosition: 'top',
    });
  }
}
