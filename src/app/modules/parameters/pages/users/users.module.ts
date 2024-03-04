import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserModule } from './components/user/user.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserFiltersModule } from './components/user-filters/user-filters.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UsersRoutingModule,
    UserModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    UserFiltersModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    SearchbarModule,
    MatPaginatorModule
  ]
})
export class UsersModule {}
