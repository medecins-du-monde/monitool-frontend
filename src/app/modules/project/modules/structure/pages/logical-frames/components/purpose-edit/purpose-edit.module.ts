import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurposeEditComponent } from './purpose-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { OutputEditModule } from '../output-edit/output-edit.module';

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
    OutputEditModule
  ],
  exports: [PurposeEditComponent]
})
export class PurposeEditModule { }
