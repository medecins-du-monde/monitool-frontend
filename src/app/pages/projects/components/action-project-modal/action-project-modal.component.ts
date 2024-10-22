import { Component, Inject } from '@angular/core';
import { ActionProjectModalModule } from './action-project-modal.module';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import ProjectAction from 'src/app/models/interfaces/project-action.model';

@Component({
  selector: 'app-action-project-modal',
  templateUrl: './action-project-modal.component.html',
  styleUrls: ['./action-project-modal.component.scss']
})
export class ActionProjectModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ActionProjectModalModule>,
    @Inject(MAT_DIALOG_DATA) public projectAction: ProjectAction
  ) { }

  onSubmit(){
    this.dialogRef.close(true);
  }
}
