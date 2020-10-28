import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloneProjectModalComponent } from './clone-project-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CloneProjectModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [CloneProjectModalComponent]
})
export class CloneProjectModalModule { }
