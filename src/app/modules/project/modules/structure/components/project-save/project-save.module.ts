import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSaveComponent } from './project-save.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ProjectSaveComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ProjectSaveComponent]
})
export class ProjectSaveModule { }
