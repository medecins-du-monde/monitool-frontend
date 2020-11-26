import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityEditComponent } from './activity-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ExtraIndicatorModule } from '../../../../components/extra-indicator/extra-indicator.module';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';

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
    ExtraIndicatorModule
  ],
  exports: [ActivityEditComponent]
})
export class ActivityEditModule { }
