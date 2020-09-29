import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureComponent } from './structure.component';
import { ProjectSaveModule } from './components/project-save/project-save.module';
import { StructureRoutingModule } from './structure-routing.module';

@NgModule({
  declarations: [StructureComponent],
  imports: [
    CommonModule,
    StructureRoutingModule,
    ProjectSaveModule
  ],
  providers: [
    // MatDatepickerModule,
    // MatNativeDateModule
  ]
})
export class StructureModule { }
