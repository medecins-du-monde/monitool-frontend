import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule
    ]
})
export class BreadcrumbModule { }
