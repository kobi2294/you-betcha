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
      this.openSnackBar(`Error: ${err.message}`, 'Ok', 'error-snackbar');
    } else if (typeof err === 'string') {
      this.openSnackBar(`Error: ${err}`, 'Ok', 'error-snackbar');
    } else {
      this.openSnackBar(`Error: ${err}`, 'Ok', 'error-snackbar');
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
