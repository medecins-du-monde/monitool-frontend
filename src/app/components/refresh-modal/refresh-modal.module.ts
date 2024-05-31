import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefreshModalComponent } from './refresh-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [RefreshModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
  ]
})
export class RefreshModalModule { }
