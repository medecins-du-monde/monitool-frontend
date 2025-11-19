import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsRoutingModule } from './inputs-routing.module';
import { InputsComponent } from './inputs.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [InputsComponent],
  imports: [
    CommonModule,
    InputsRoutingModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule
  ]
})
export class InputsModule { }
