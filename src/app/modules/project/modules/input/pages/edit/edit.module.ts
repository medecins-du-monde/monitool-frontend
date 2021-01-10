import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    FormsModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class EditModule { }
