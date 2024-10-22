import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSaveComponent } from './project-save.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';



@NgModule({
  declarations: [ProjectSaveComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [ProjectSaveComponent]
})
export class ProjectSaveModule { }
