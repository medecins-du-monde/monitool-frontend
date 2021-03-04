import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingChangesGuard } from 'src/app/guards/pending-changes.guard';
import { LogicalFrameEditComponent } from './components/logical-frame-edit/logical-frame-edit.component';
import { LogicalFramesListComponent } from './components/logical-frames-list/logical-frames-list.component';
import { LogicalFramesComponent } from './logical-frames.component';

const routes: Routes = [{
  path: '',
  component: LogicalFramesComponent,
  children: [
    { path: '', component: LogicalFramesListComponent },
    { path: ':id', component: LogicalFrameEditComponent, canDeactivate: [PendingChangesGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicalFramesRoutingModule { }
