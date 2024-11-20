import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserModule } from './components/user/user.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { UserFiltersModule } from './components/user-filters/user-filters.module';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';

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
