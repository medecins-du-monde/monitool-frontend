import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';

@NgModule({
    declarations: [SitesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SitesRoutingModule
    ]
})
export class SitesModule { }
