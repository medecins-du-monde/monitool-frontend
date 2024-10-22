import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
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
