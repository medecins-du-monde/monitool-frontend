import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserModalModule } from '../user-modal/user-modal.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    UserModalModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
