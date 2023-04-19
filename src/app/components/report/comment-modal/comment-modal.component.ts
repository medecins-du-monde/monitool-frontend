import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.comment = data.comment;
    }
  }


}
