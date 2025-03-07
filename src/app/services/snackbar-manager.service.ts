import { Injectable } from '@angular/core';
import{ ISankBarManagerService } from './isnackbar-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService implements ISankBarManagerService {

  constructor(
    private readonly snackbar: MatSnackBar
  ) { }

  show(message: string, action?: string, duration?: number): void {
    if (!action) {
      action = 'fechar'
    }

    if (!duration) {
      duration = 3000
    }

    this.snackbar.open(message, action, { duration, verticalPosition: 'top', horizontalPosition: 'right' })
  }
}
