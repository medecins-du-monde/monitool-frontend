import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementEditComponent } from './form-element-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PartitionModalModule } from '../partition-modal/partition-modal.module';
import { MatRadioModule } from '@angular/material/radio';
import { TableStructureModule } from '../table-structure/table-structure.module';
import { MatMenuModule } from '@angular/material/menu';

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
