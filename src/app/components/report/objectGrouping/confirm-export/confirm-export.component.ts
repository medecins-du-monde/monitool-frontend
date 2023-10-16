import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-export',
  templateUrl: './confirm-export.component.html',
  styleUrls: ['./confirm-export.component.scss']
})
export class ConfirmExportComponent implements OnInit {

  public title: string;
  public type = 'current-view';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title;
    }
    if (this.data.type) {
      this.type = this.data.type;
    }
  }

}
