import { Component, EventEmitter, Output } from '@angular/core';

const ROLES = ['admin', 'common', 'project'] as const;
type Roles = typeof ROLES[number];
const ROLE_COLORS: Record<Roles, string> = {
  admin: '#337ab7',
  common: '#8a6d3b',
  project: '#3c763d'
};
const ROLES_TRANSLATIONS: Record<Roles, string> = {
  admin: 'AdminRole',
  common: 'CommonRole',
  project: 'ProjectRole'
};
@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.scss']
})
export class UserFiltersComponent {
  public selectedRoles: Roles[] = Array.from(ROLES);
  @Output() selectedRolesChange = new EventEmitter<string[]>();

  public showDeleted = false;
  @Output() showDeletedChange = new EventEmitter<boolean>();

  public roleColors = ROLE_COLORS;
  public roleTranslations = ROLES_TRANSLATIONS;
  public roles = ROLES;

  toggleRow(role: Roles): void {
    if (this.selectedRoles.includes(role)) {
      // We always want a role selected
      if (this.selectedRoles.length > 1) {
        this.selectedRoles = this.selectedRoles.filter(r => r !== role);
      }
    } else {
      this.selectedRoles = [...this.selectedRoles, role];
    }

    this.selectedRolesChange.emit(this.selectedRoles);
  }
}
