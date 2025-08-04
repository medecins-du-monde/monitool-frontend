import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogicalFrameEditComponent } from './logical-frame-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import { PurposeEditModule } from '../purpose-edit/purpose-edit.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';
import { CollectionSitesSelectorModule } from '../../../../components/collection-sites-selector/collection-sites-selector.module';
import { IndicatorListModule } from '../indicator-list/indicator-list.module';

@NgModule({
  declarations: [LogicalFrameEditComponent],
  imports: [
    CommonModule,
    CollectionSitesSelectorModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    PurposeEditModule,
    IndicatorModalModule,
    ExtraIndicatorModule,
    DragDropModule,
    LocalizedDatePipeModule,
    IndicatorListModule
  ],
  exports: [LogicalFrameEditComponent]
})
export class LogicalFrameEditModule { }
