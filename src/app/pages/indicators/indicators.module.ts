import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IndicatorModule } from 'src/app/components/indicator/indicator.module';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';

@NgModule({
    declarations: [IndicatorsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IndicatorsRoutingModule,
        IndicatorModule
    ]
})
export class IndicatorsModule { }
