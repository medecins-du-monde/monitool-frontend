import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourcesListComponent } from './data-sources-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { DataSourceModule } from '../data-source/data-source.module';
import { DeleteModalModule } from '../../../../components/delete-modal/delete-modal.module';



@NgModule({
  declarations: [DataSourcesListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DataSourceModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    CdkTableModule,
    DeleteModalModule
  ],
  exports: [DataSourcesListComponent]
})
export class DataSourcesListModule { }
