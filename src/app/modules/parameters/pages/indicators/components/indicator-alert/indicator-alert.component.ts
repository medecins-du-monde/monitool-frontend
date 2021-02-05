import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';

@Component({
  selector: 'app-indicator-alert',
  templateUrl: './indicator-alert.component.html',
  styleUrls: ['./indicator-alert.component.scss']
})
export class IndicatorAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<IndicatorAlertComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Indicator) {}

  onClose(arg: boolean): void{
    this.dialogRef.close(arg);
  }

}
