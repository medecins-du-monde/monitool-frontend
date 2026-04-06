import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

const CHAR_LIMIT = 450;

const TEXT_EDITOR_OPTIONS = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link']                         // link and image, video
  ]
};

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
  originalComment?: string;
  comment = '';

  textEditorModules = TEXT_EDITOR_OPTIONS;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CommentModalInput) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.originalComment = data.comment;
      this.comment = data.comment;
    }
  }
}
