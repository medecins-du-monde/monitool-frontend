import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { ChartModule} from './chart/chart.module';

@NgModule({
    declarations: [GeneralComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralRoutingModule,
        ChartModule
    ]
})
export class GeneralModule { }
