import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityEditComponent } from './activity-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslateModule } from '@ngx-translate/core';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ActivityEditComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    IndicatorModalModule,
    ExtraIndicatorModule,
    DragDropModule
  ],
  exports: [ActivityEditComponent]
})
export class ActivityEditModule { }
