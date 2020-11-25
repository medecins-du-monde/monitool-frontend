import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevisionSummaryComponent } from './revision-summary.component';

@NgModule({
    declarations: [RevisionSummaryComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ RevisionSummaryComponent ],
})
export class RevisionSummaryModule { }
