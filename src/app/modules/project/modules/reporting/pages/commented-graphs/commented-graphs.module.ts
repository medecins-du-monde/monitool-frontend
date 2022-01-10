import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentedGraphsRoutingModule } from './commented-graphs-routing.module';
import { CommentedGraphsComponent } from './commented-graphs.component';


@NgModule({
  declarations: [CommentedGraphsComponent],
  imports: [
    CommonModule,
    CommentedGraphsRoutingModule
  ]
})
export class CommentedGraphsModule { }
