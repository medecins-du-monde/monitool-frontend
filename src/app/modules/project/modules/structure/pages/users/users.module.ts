import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UserModule } from './components/user/user.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule,
        UsersRoutingModule,
        UserModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class UsersModule { }
