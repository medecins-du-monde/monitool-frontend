import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceComponent } from './data-source.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [DataSourceComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [DataSourceComponent]
})
export class DataSourceModule { }
