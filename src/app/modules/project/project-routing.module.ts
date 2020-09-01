import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: '',
        redirectTo: 'structure',
        pathMatch: 'full',
      },
      {
        path: 'structure',
        loadChildren: () => import('./modules/structure/structure.module')
        .then(m => m.StructureModule)
      },
      {
        path: 'input',
        loadChildren: () => import('./modules/input/input.module')
        .then(m => m.InputModule)
      },
      {
        path: 'reporting',
        loadChildren: () => import('./modules/reporting/reporting.module')
        .then(m => m.ReportingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
