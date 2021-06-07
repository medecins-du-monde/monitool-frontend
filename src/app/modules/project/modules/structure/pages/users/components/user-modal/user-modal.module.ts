import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { CollectionSitesSelectorModule } from '../../../../components/collection-sites-selector/collection-sites-selector.module';
import { DataSourceSelectorModule } from '../../../../components/data-source-selector/data-source-selector.module';


@NgModule({
  declarations: [UserModalComponent],
  imports: [
    CommonModule,
    CollectionSitesSelectorModule,
    DataSourceSelectorModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [UserModalComponent]
})
export class UserModalModule { }
