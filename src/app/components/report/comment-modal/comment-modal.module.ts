import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CommentModalComponent } from './comment-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CommentModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule
  ],
  exports: [CommentModalComponent]
})
export class CommentModalModule { }
