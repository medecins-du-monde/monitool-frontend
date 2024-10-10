import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceEditComponent } from './data-source-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormElementEditModule } from '../form-element-edit/form-element-edit.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';
import { CollectionSitesSelectorModule } from '../../../../components/collection-sites-selector/collection-sites-selector.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

@NgModule({
  declarations: [DataSourceEditComponent],
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
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    FormElementEditModule,
    DragDropModule,
    LocalizedDatePipeModule,
    MatMenuModule
  ],
  exports: [DataSourceEditComponent]
})
export class DataSourceEditModule { }
