import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-refresh-modal',
  templateUrl: './refresh-modal.component.html',
  styleUrls: ['./refresh-modal.component.scss']
})
export class RefreshModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RefreshModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  reload(): void {
    this.dialogRef.close(true);
  }

}
