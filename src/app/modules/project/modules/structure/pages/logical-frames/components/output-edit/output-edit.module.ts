import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputEditComponent } from './output-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ActivityEditModule } from '../activity-edit/activity-edit.module';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';

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
    ExtraIndicatorModule
  ],
  exports: [OutputEditComponent]
})
export class OutputEditModule { }
