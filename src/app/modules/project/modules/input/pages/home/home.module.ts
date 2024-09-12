import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarTripleModule } from 'src/app/components/progress-bar-triple/progress-bar-triple.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

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
