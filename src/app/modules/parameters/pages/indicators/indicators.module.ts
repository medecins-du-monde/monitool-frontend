import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IndicatorModalModule } from './components/indicator-modal/indicator-modal.module';
import { IndicatorModule } from './components/indicator/indicator.module';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';

@NgModule({
    declarations: [IndicatorsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IndicatorsRoutingModule,
        MatButtonModule,
        MatIconModule,
        IndicatorModule,
        IndicatorModalModule
    ]
})
export class IndicatorsModule { }
