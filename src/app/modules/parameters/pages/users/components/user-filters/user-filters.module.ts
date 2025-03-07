import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFiltersComponent } from './user-filters.component';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserFiltersComponent],
  imports: [CommonModule, MatChipsModule, TranslateModule, MatIconModule],
  exports: [UserFiltersComponent]
})
export class UserFiltersModule {}
