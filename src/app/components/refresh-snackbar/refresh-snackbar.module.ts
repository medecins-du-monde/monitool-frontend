import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RefreshSnackbarComponent } from './refresh-snackbar.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [RefreshSnackbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [RefreshSnackbarComponent]
})
export class RefreshSnackbarModule { }
