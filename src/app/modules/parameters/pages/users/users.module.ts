import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
        UserModule
    ]
})
export class UsersModule { }
