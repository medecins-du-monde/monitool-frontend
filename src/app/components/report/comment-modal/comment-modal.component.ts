import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const CHAR_LIMIT = 450;

type CommentModalInput = {
  action: 'add' | 'edit';
  comment?: {
    value: string,
    cellValue?: string
  };
};

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {

  action: string;
  comment: { value: string, cellValue?: string };

  charLimit = CHAR_LIMIT;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CommentModalInput) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.comment = data.comment;
    }
  }
}
