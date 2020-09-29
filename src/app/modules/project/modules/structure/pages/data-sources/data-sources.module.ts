import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DataSourceEditModule } from './components/data-source-edit/data-source-edit.module';
import { DataSourceModule } from './components/data-source/data-source.module';
import { DataSourcesComponent } from './data-sources.component';

@NgModule({
    declarations: [DataSourcesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DataSourceModule,
        DataSourceEditModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DataSourcesModule { }
