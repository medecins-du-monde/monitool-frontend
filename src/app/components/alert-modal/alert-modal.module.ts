import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [AlertModalComponent]
})
export class AlertModalModule { }
