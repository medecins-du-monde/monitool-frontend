import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/guards/auth-guard.service';
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
        data: { roles: ['read'] },
        loadChildren: () => import('./modules/reporting/reporting.module')
        .then(m => m.ReportingModule),
        //  canActivate : [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
