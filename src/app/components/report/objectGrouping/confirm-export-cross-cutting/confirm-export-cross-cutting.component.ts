import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirm-export-cross-cutting',
  templateUrl: './confirm-export-cross-cutting.component.html',
  styleUrls: ['./confirm-export-cross-cutting.component.scss']
})
export class ConfirmExportCrossCuttingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
