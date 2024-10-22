import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class BreadcrumbModule { }
