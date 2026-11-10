import { Component, Inject } from '@angular/core';
import { DataImportService } from 'src/app/services/data-import.service';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { groupImportErrors, ImportError, ImportErrorGroup } from 'src/app/utils/import-diff';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent {
  constructor(
    private dataImportService: DataImportService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: {path: string, siteName?: string},
    public dialogRef: MatDialogRef<ImportModalComponent>,
    private dialog: MatDialog
  ) {}

  public formatedData?: any;
  public errors?: ImportErrorGroup;
  public fileName?: string;
  public sheets: any[] = [];

  private file?: any;

  onFileChange(event: any) {
    const file = event.target.files[0];
    // Allows picking the same file again once it has been corrected.
    event.target.value = '';

    this.errors = undefined;
    this.formatedData = undefined;
    this.sheets = [];

    if (file) {
      this.file = file; // Save file for later use
      this.fileName = file.name;
      this.dataImportService.getFileSheets(file).then(sheets => {
        if (sheets.length > 1) {
          this.sheets = sheets; // Show sheet selection if multiple sheets
        } else {
          this.importFile();
        }
      }).catch(res => this.showErrors(res));
    } else {
      this.fileName = undefined;
    }
  }

  onSheetSelect(sheetIndex: number) {
    if (this.file) {
      this.importFile(sheetIndex);
    }
  }

  private importFile(sheetIndex?: number) {
    this.dataImportService.importFile(this.file, this.data.path, sheetIndex).then((response) => {
      this.errors = undefined;
      this.formatedData = response;
    }).catch(res => this.showErrors(res));
  }

  private showErrors(res: any) {
    let errors: ImportError[];
    if (res?.status === 413) {
      errors = [{ key: 'import.error.too-large' }];
    } else if (res?.key) {
      // The file could not be read
      errors = [{ key: res.key }];
    } else if (res?.error && res.error.length > 0) {
      errors = res.error;
    } else {
      errors = [{ key: 'import.error.generic' }];
    }
    this.errors = groupImportErrors(errors, (key, extra) => this.translateService.instant(key, extra), this.data.siteName);
    this.formatedData = undefined;
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
