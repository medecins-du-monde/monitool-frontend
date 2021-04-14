import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DataSourceEditModule } from './components/data-source-edit/data-source-edit.module';
import { DataSourcesListModule } from './components/data-sources-list/data-sources-list.module';
import { DataSourcesRoutingModule } from './data-sources-routing.module';
import { DataSourcesComponent } from './data-sources.component';

@NgModule({
    declarations: [DataSourcesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DataSourcesRoutingModule,
        DataSourcesListModule,
        DataSourceEditModule
    ]
})
export class DataSourcesModule { }
