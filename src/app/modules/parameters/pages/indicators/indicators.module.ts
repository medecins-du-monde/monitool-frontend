import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IndicatorModalModule } from './components/indicator-modal/indicator-modal.module';
import { IndicatorModule } from './components/indicator/indicator.module';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

@NgModule({
    declarations: [IndicatorsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IndicatorsRoutingModule,
        MatButtonModule,
        MatIconModule,
        IndicatorModule,
        IndicatorModalModule,
        MatExpansionModule,
        MatTooltipModule,
        MatChipsModule
    ]
})
export class IndicatorsModule { }
