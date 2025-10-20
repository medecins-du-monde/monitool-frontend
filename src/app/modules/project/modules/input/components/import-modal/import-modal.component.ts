import { Component, Inject } from '@angular/core';
import { DataImportService } from 'src/app/services/data-import.service';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent {
  constructor(
    private dataImportService: DataImportService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: {path: string},
    public dialogRef: MatDialogRef<ImportModalComponent>,
    private dialog: MatDialog
  ) {}

  public formatedData?: any;
  public errors: string[] = [];
  public fileName?: string;

  onFileChange(event: any) {
    if (event.target.files[0]) {
      this.fileName = event.target.files[0].name;
      this.dataImportService.importFile(event.target.files[0], this.data.path).then((response) => {
        this.errors = [];
        this.formatedData = response;
      }).catch(res => {
        if (res.error && res.error.length > 0) {
          this.errors = res.error.map(error => this.translateService.instant(error.key, error.extra));
        } else {
          this.errors = [this.translateService.instant('import.error.generic')]
        }
        this.formatedData = undefined;
      });
    } else {
      this.fileName = undefined;
      this.errors = [];
      this.formatedData = undefined;
    }
  }

  confirm() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'import.import-warning', warning: true}});
    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res.confirm){
        this.dialogRef.close({ data: this.formatedData });
        dialogSubscription.unsubscribe();
      }
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
