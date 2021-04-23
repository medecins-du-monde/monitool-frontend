import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CollectionSitesSelectorComponent } from './collection-sites-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [CollectionSitesSelectorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CollectionSitesSelectorComponent]
})
export class CollectionSitesSelectorModule { }
