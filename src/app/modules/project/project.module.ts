import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { InformationsPanelModule } from 'src/app/components/informations-panel/informations-panel.module';
import { CloneBannerModule } from 'src/app/components/clone-banner/clone-banner.module';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ProjectRoutingModule,
    SidenavModule,
    MatSidenavModule,
    BreadcrumbModule,
    InformationsPanelModule,
    CloneBannerModule
  ]
})
export class ProjectModule { }
