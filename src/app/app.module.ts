import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import icons from '../assets/svg/svg-icons';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectComponent,
    IndicatorComponent,
    IndicatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconsModule.forRoot({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px'
      },
      icons
    }),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
