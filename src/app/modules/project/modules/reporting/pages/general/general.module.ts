import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { ChartModule} from 'src/app/components/shared/chart/chart.module';
import { ObjectGroupingModule} from './objectGrouping/object-grouping.module';
import { FilterModule} from './filter/filter.module';
import { DataTableModule } from './dataTable/data-table.module';


@NgModule({
    declarations: [GeneralComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralRoutingModule,
        ChartModule,
        ObjectGroupingModule,
        FilterModule,
        DataTableModule
    ]
})
export class GeneralModule { }
