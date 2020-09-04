import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports: [SearchbarComponent]
})
export class SearchbarModule { }
