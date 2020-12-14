import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableComponent } from './data-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [DataTableComponent],
    exports: [DataTableComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatIconModule,
        MatGridListModule,
        MatTableModule
    ]
})
export class DataTableModule { }
