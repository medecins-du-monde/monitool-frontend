import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HomeCardModule } from './components/home-card/home-card.module';
import { HomeIllustrationModule } from './components/home-illustration/home-illustration.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        HomeRoutingModule,
        HomeCardModule,
        HomeIllustrationModule
    ]
})
export class HomeModule { }
