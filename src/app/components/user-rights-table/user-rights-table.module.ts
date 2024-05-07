import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRightsTableComponent } from './user-rights-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [UserRightsTableComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [UserRightsTableComponent]
})
export class UserRightsTableModule { }
