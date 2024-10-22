import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementEditComponent } from './form-element-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { PartitionModalModule } from '../partition-modal/partition-modal.module';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { TableStructureModule } from '../table-structure/table-structure.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

@NgModule({
  declarations: [FormElementEditComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    PartitionModalModule,
    MatRadioModule,
    TableStructureModule
  ],
  exports: [FormElementEditComponent]
})
export class FormElementEditModule { }
