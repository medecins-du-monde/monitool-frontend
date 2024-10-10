import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRightsTableComponent } from './user-rights-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

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
