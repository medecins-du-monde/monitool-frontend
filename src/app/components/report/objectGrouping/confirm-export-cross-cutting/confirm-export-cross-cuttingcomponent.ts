import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirm-export-cross-cutting',
  templateUrl: './confirm-export-cross-cutting.component.html',
  styleUrls: ['./confirm-export-cross-cutting.component.scss']
})
export class ConfirmExportCrossCuttingComponent implements OnInit {

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
