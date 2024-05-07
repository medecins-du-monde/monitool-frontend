import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { UserRightsTableModule } from 'src/app/components/user-rights-table/user-rights-table.module';

@NgModule({
  declarations: [UserModalComponent],
  imports: [
    CommonModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    UserRightsTableModule
  ],
  exports: [UserModalComponent]
})
export class UserModalModule { }
