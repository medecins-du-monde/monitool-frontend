import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogicalFrameEditComponent } from './logical-frame-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { PurposeEditModule } from '../purpose-edit/purpose-edit.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';

@NgModule({
  declarations: [LogicalFrameEditComponent],
  imports: [
    CommonModule,
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
    LocalizedDatePipeModule
  ],
  exports: [LogicalFrameEditComponent]
})
export class LogicalFrameEditModule { }
