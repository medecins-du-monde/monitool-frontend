import { Component,  Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Theme } from 'src/app/models/classes/theme.model';

@Component({
  selector: 'app-theme-alert',
  templateUrl: './theme-alert.component.html',
  styleUrls: ['./theme-alert.component.scss']
})
export class ThemeAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<ThemeAlertComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Theme) { }

  onClose(arg: boolean): void {
    this.dialogRef.close(arg);
  }
}