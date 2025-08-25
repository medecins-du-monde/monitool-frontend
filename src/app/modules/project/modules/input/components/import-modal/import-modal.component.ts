import { Component, Inject } from '@angular/core';
import { DataImportService } from 'src/app/services/data-import.service';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent {
  constructor(private dataImportService: DataImportService, @Inject(MAT_DIALOG_DATA) public data: {path: string}) {}

  onFileChange(event: any) {
    this.dataImportService.importFile(event.target.files[0], this.data.path);
  }
}
