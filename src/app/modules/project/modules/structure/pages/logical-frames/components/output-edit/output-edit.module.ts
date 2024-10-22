import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputEditComponent } from './output-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslateModule } from '@ngx-translate/core';
import { ActivityEditModule } from '../activity-edit/activity-edit.module';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [OutputEditComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    ActivityEditModule,
    IndicatorModalModule,
    ExtraIndicatorModule,
    DragDropModule
  ],
  exports: [OutputEditComponent]
})
export class OutputEditModule { }
