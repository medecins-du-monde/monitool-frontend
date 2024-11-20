import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports: [SearchbarComponent]
})
export class SearchbarModule { }
