import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { UserModule } from './components/user/user.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        TranslateModule,
        UsersRoutingModule,
        UserModule,
        MatButtonModule,
        MatIconModule,
        DragDropModule,
        CdkTableModule
    ]
})
export class UsersModule { }
