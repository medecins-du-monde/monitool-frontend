import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarTripleModule } from 'src/app/components/progress-bar-triple/progress-bar-triple.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        HomeRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        ProgressBarTripleModule,
        RouterModule,
        MatTooltipModule
    ]
})
export class HomeModule { }
