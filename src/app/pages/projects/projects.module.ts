import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModule } from './components/project/project.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { MatIconModule } from '@angular/material/icon';
import { ActionProjectModalModule } from './components/action-project-modal/action-project-modal.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InformationsPanelModule } from 'src/app/components/informations-panel/informations-panel.module';

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
        InformationsPanelModule
    ]
})
export class ProjectsModule { }
