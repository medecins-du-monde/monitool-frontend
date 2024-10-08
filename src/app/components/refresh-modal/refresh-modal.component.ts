import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-refresh-modal',
  templateUrl: './refresh-modal.component.html',
  styleUrls: ['./refresh-modal.component.scss']
})
export class RefreshModalComponent {

  constructor(
    public dialogRef: MatDialogRef<RefreshModalComponent>,
  ) { }
  
  reload(): void {
    this.dialogRef.close(true);
  }

}
