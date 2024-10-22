import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

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
  originalComment?: string;
  comment: { value: string, cellValue?: string } = { value: '' };

  charLimit = CHAR_LIMIT;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CommentModalInput) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.originalComment = data.comment.value;
      this.comment = {...data.comment};
    }
  }
}
