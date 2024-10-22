import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from './components/theme/theme.module';
import { ThematicsRoutingModule } from './thematics-routing.module';
import { ThematicsComponent } from './thematics.component';

@NgModule({
    declarations: [ThematicsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ThematicsRoutingModule,
        ThemeModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ThematicsModule { }
