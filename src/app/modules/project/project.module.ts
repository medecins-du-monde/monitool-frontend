import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ProjectRoutingModule,
    SidenavModule,
    SvgIconsModule
  ]
})
export class ProjectModule { }
