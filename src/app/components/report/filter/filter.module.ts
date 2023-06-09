import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FilterComponent } from './filter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CollectionSitesSelectorModule } from 'src/app/modules/project/modules/structure/components/collection-sites-selector/collection-sites-selector.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FilterComponent],
  exports: [FilterComponent],
  imports: [
    CommonModule,
    CollectionSitesSelectorModule,
    TranslateModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class FilterModule {}
