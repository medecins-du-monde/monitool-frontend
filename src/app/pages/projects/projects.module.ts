import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectModule } from './components/project/project.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { MatIconModule } from '@angular/material/icon';
import { ActionProjectModalModule } from './components/action-project-modal/action-project-modal.module';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { InformationsPanelModule } from 'src/app/components/informations-panel/informations-panel.module';
import { MatLegacyPaginatorIntl as MatPaginatorIntl, MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { PaginatorI18n } from 'src/app/utils/paginator-I18n';

@NgModule({
    declarations: [ProjectsComponent],
    imports: [
        CommonModule,
        ActionProjectModalModule,
        TranslateModule,
        ProjectsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTooltipModule,
        SearchbarModule,
        ProjectModule,
        InformationsPanelModule,
        MatPaginatorModule
    ],
    providers: [
      {
        provide: MatPaginatorIntl, deps: [TranslateService],
        useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
      }
    ]
})
export class ProjectsModule { }
