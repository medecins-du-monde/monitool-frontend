import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrameComponent } from './logical-frame.component';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';
import { MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';

@NgModule({
  declarations: [LogicalFrameComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    LocalizedDatePipeModule,
    MatChipsModule
  ],
  exports: [LogicalFrameComponent]
})
export class LogicalFrameModule { }
