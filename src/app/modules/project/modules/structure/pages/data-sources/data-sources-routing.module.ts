import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSourceEditComponent } from './components/data-source-edit/data-source-edit.component';
import { DataSourcesListComponent } from './components/data-sources-list/data-sources-list.component';
import { DataSourcesComponent } from './data-sources.component';


const routes: Routes = [{
  path: '',
  component: DataSourcesComponent,
  children: [
    { path: '', component: DataSourcesListComponent },
    { path: ':id', component: DataSourceEditComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSourcesRoutingModule { }
