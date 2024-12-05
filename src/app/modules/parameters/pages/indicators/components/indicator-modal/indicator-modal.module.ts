import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorModalComponent } from './indicator-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [IndicatorModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    QuillModule,
    MatTabsModule
  ],
  exports: [IndicatorModalComponent]
})
export class IndicatorModalModule { }
