import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RevisionSummaryComponent } from './revision-summary.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [RevisionSummaryComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ RevisionSummaryComponent ],
})
export class RevisionSummaryModule { }
