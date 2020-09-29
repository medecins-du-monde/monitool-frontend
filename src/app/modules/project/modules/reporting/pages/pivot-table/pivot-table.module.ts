import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PivotTableRoutingModule } from './pivot-table-routing.module';
import { PivotTableComponent } from './pivot-table.component';

@NgModule({
    declarations: [PivotTableComponent],
    imports: [
        CommonModule,
        TranslateModule,
        PivotTableRoutingModule
    ]
})
export class PivotTableModule { }
