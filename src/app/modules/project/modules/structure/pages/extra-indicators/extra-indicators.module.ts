import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ExtraIndicatorModule } from '../../components/extra-indicator/extra-indicator.module';
import { ExtraIndicatorsRoutingModule } from './extra-indicators-routing.module';
import { ExtraIndicatorsComponent } from './extra-indicators.component';

@NgModule({
    declarations: [ExtraIndicatorsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ExtraIndicatorsRoutingModule,
        ExtraIndicatorModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ExtraIndicatorsModule { }
