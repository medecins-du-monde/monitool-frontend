import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { DataSourceEditModule } from './components/data-source-edit/data-source-edit.module';
import { DataSourceModule } from './components/data-source/data-source.module';
import { DataSourcesRoutingModule } from './data-sources-routing.module';
import { DataSourcesComponent } from './data-sources.component';

@NgModule({
    declarations: [DataSourcesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DataSourcesRoutingModule,
        DataSourceModule,
        DataSourceEditModule,
        MatButtonModule,
        MatIconModule,
        DragDropModule,
        CdkTableModule
    ]
})
export class DataSourcesModule { }
