import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FilterComponent } from './filter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [FilterComponent],
    exports: [FilterComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule,
        MatIconModule,
        MatGridListModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule ,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class FilterModule { }
