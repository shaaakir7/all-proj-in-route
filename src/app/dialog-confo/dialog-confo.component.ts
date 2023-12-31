import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confo',
  templateUrl: './dialog-confo.component.html',
  styleUrls: ['./dialog-confo.component.scss'],
})
export class DialogConfoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  no(): void {
    this.dialogRef.close(false);
  }

  yes(): void {
    this.dialogRef.close(true);
  }
}
