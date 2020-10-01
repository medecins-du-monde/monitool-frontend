import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CalendarRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class CalendarModule { }
