import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.scss'
})
export class YesNoDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any
  ) {}
}
