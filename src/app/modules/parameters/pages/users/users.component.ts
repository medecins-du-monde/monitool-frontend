import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/classes/user.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  informations: InformationItem[] = [
    {
      res1: 'InformationPanel.User_list',
      res2: ''
    },
    {
      res1: 'InformationPanel.New_users_access',
      res2: 'InformationPanel.New_users_access_response',
      new: true
    }
  ]
  users: User[];
  filteredUsers: User[];

  private showDeleted = false;
  private showByRoles = ['common', 'admin', 'project'];
  public searchQuery = new UntypedFormControl('');
  private searchTimeout: NodeJS.Timeout;

  private subscriptions: Subscription[] = [];

  pageNumber = 0;
  totalItem = 0;
  shownUsers: User[];

  constructor(private userService: UserService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.updateInformationPanel(this.informations);
    this.userService.list();
    this.subscriptions.push(
      this.userService.userList.subscribe((users: User[]) => {
        this.users = users;
        this.applyFilters();
      })
    );
  }

  public applyFilters(resetPage = true): void {
    // Apply role and deleted filters
    this.filteredUsers = this.users.filter(
      u => (
        this.showDeleted ?
          (Object.prototype.hasOwnProperty.call(u, 'active') && !u.active) :
          (!Object.prototype.hasOwnProperty.call(u, 'active') || u.active)
      ) && this.showByRoles.includes(u.role)
    );

    // Apply search query filter
    this.filteredUsers = this.filteredUsers.filter(
      u =>
        u.name.toLowerCase().includes(this.searchQuery.value.toLowerCase()) ||
        u.id.toLowerCase().includes(this.searchQuery.value.toLowerCase())
    );
    if (resetPage) {
      this.pageNumber = 0;
    }
    this.setPagination();
  }

  onSearchChange($event: string): void {
    this.searchQuery.setValue($event);
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.applyFilters(), 500);
  }

  onEdit(user: User): void {
    this.userService.save(user);
    this.applyFilters(false);
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

  paginationChange(e: any) {
    if (e.pageIndex !== this.pageNumber) {
      this.pageNumber = e.pageIndex;
      this.setPagination();
    }
  }

  private setPagination() {
    this.totalItem = this.filteredUsers.length;
    this.shownUsers = this.filteredUsers.slice(this.pageNumber * 12, this.pageNumber * 12 + 12);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
