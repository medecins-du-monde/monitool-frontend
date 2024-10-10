import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent{

  public description = 'description';

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'datasource' | 'data',
      item: string,
      plural: boolean
    },
  ) {
    if (data.plural) {
      this.description += '-plural';
    }
  }

  onSubmit(): void {
    this.dialogRef.close({ delete: true });
  }
}
