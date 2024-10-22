import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionProjectModalComponent } from './action-project-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ActionProjectModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [ActionProjectModalComponent]
})
export class ActionProjectModalModule { }
