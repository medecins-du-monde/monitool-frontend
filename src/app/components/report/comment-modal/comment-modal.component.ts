import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type CommentModalInput = {
  action: 'add' | 'edit';
  comment?: string;
};

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {
  action: string;
  comment: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CommentModalInput) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.comment = data.comment;
    }
  }
}
