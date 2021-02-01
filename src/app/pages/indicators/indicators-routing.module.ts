import { IndicatorReportComponent } from './components/indicator-report/indicator-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorsComponent } from './indicators.component';

const routes: Routes = [{
  path: '',
  component: IndicatorsComponent
},
{
  path: 'indicator/:id',
  component: IndicatorReportComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorsRoutingModule { }
