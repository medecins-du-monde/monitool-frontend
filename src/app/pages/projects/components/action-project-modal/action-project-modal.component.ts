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

  state: 'confirm' | 'loading' | 'success' | 'error' = 'confirm';
  result: any;
  error: any;

  constructor(
    public dialogRef: MatDialogRef<ActionProjectModalModule>,
    @Inject(MAT_DIALOG_DATA) public projectAction: ProjectAction
  ) { }

  async onSubmit(){
    if (!this.projectAction.action) {
      this.dialogRef.close(true);
      return;
    }

    this.state = 'loading';
    try {
      this.result = await this.projectAction.action();
      this.state = 'success';
    } catch (error) {
      this.error = error;
      this.state = 'error';
    }
  }

  onConfirmResult(open: boolean): void {
    this.dialogRef.close({ result: this.result, open });
  }

  onDismissError(): void {
    this.dialogRef.close(false);
  }
}
