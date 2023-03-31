import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {

  action: string;
  comment: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommentModalComponent>
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.comment = data.comment;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
