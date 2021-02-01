import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingChangesGuard } from 'src/app/guards/pending-changes.guard';
import { EditComponent } from './edit.component';

const routes: Routes = [{
  path: '**',
  component: EditComponent,
  canDeactivate: [PendingChangesGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
