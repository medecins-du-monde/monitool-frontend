import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DataSourceEditModule } from './components/data-source-edit/data-source-edit.module';
import { DataSourcesListModule } from './components/data-sources-list/data-sources-list.module';
import { ExistingPartitionModalModule } from './components/existing-partition-modal/existing-partition-modal.module';
import { DataSourcesRoutingModule } from './data-sources-routing.module';
import { DataSourcesComponent } from './data-sources.component';

@NgModule({
    declarations: [DataSourcesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DataSourcesRoutingModule,
        DataSourcesListModule,
        DataSourceEditModule,
        ExistingPartitionModalModule
    ]
})
export class DataSourcesModule { }
