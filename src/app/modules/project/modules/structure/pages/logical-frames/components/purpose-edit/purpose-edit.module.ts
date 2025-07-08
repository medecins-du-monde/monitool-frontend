import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurposeEditComponent } from './purpose-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslateModule } from '@ngx-translate/core';
import { OutputEditModule } from '../output-edit/output-edit.module';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IndicatorListModule } from '../indicator-list/indicator-list.module';

@NgModule({
  declarations: [PurposeEditComponent],
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
    OutputEditModule,
    IndicatorModalModule,
    ExtraIndicatorModule,
    DragDropModule,
    IndicatorListModule
  ],
  exports: [PurposeEditComponent]
})
export class PurposeEditModule { }
