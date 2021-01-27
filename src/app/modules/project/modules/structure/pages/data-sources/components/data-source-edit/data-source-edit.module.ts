import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceEditComponent } from './data-source-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormElementEditModule } from '../form-element-edit/form-element-edit.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DataSourceEditComponent],
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
    FormElementEditModule,
    DragDropModule
  ],
  exports: [DataSourceEditComponent]
})
export class DataSourceEditModule { }
