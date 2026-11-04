import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatIconModule } from '@angular/material/icon';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';
import { CloneBannerComponent } from './clone-banner.component';
import { RemoveCloneTagModalComponent } from './remove-clone-tag-modal/remove-clone-tag-modal.component';

@NgModule({
  declarations: [CloneBannerComponent, RemoveCloneTagModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    LocalizedDatePipeModule
  ],
  exports: [CloneBannerComponent]
})
export class CloneBannerModule { }
