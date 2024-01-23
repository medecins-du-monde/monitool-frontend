import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/classes/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  filteredUsers: User[];

  private showDeleted = false;
  private showByRoles = ['common', 'admin', 'project'];
  public searchQuery = new FormControl('');
  private searchTimeout: NodeJS.Timeout;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.list().then((res: User[]) => {
      this.users = res;
      this.applyFilters();
    });
  }

  public applyFilters(): void {
    // Apply role and deleted filters
    this.filteredUsers = this.users.filter(
      u =>
        (this.showDeleted ? (u.hasOwnProperty('active') && !u.active) : (!u.hasOwnProperty('active') || u.active)) &&
        this.showByRoles.includes(u.role)
    );

    // Apply search query filter
    this.filteredUsers = this.filteredUsers.filter(
      u =>
        u.name.toLowerCase().includes(this.searchQuery.value.toLowerCase()) ||
        u.id.toLowerCase().includes(this.searchQuery.value.toLowerCase())
    );
  }

  onSearchChange($event: string): void {
    this.searchQuery.setValue($event);
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.applyFilters(), 500);
  }

  onEdit(user: User): void {
    this.userService.save(user).then(() => this.getUsers());
  }

  /** Export EXCEL file with the application users */
  exportUsers(): void {
    this.userService.exportUsers();
  }

  handleUserFiltering(data: string[] | boolean): void {
    // Changed deleted users filter
    if (typeof data === 'boolean') { this.showDeleted = data; }
    // Changed roles filter
    else { this.showByRoles = data; }

    this.applyFilters();
  }
}
