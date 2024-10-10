import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { CollectionSitesSelectorModule } from '../../../../components/collection-sites-selector/collection-sites-selector.module';
import { DataSourceSelectorModule } from '../../../../components/data-source-selector/data-source-selector.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { UserRightsTableModule } from 'src/app/components/user-rights-table/user-rights-table.module';


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
    MatExpansionModule,
    NgxMatSelectSearchModule,
    UserRightsTableModule
  ],
  exports: [UserModalComponent]
})
export class UserModalModule { }
