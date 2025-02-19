import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { AlertAutoDateChangeComponent } from './alert-auto-date-change.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AlertAutoDateChangeComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  exports: [AlertAutoDateChangeComponent]
})
export class AlertAutoDateChangeModule { }
