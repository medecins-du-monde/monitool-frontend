import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ObjectGroupingComponent } from './object-grouping.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [ObjectGroupingComponent],
    exports: [ObjectGroupingComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class ObjectGroupingModule { }
