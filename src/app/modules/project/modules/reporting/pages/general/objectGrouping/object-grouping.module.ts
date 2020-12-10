import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ObjectGroupingComponent } from './object-grouping.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ObjectGroupingComponent],
    exports: [ObjectGroupingComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule,
        MatIconModule,
        MatGridListModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ObjectGroupingModule { }
