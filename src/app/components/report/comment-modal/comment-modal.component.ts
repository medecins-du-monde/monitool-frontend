import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {

  action: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    console.log(this.action);
  }

  ngOnInit(): void {
  }

}
