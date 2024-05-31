import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HintUserData, HintUsers } from 'src/app/mocked/hint-user-element.mocked';
import { HintUserData as HintUserDataProject, HintUsers as HintUsersProject } from 'src/app/mocked/hint-user-project-element.mocked';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/classes/user.model';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-user-rights-table',
  templateUrl: './user-rights-table.component.html',
  styleUrls: ['./user-rights-table.component.scss']
})
export class UserRightsTableComponent implements OnDestroy, OnInit {

  /**
   * Boolean indicating if the table needs to highlight the role for an specific user.
   * Pass true to highlight the role of the current user.
   * Pass a string with a specific role to highlight that one.
   */
  @Input() higlight: boolean | string = false;

  /**
   * String indicating the type of table to show.
   * By default the selection will be automatic.
   * Pass 'project' to show the roles of a project.
   * Pass 'platform' to show the roles of the platform.
   */
  @Input() type?: 'project' | 'platform';

  /**
   * Datasource for the rights table
   */
  public dataSource = [];
  /**
   * Table users
   */
  public users = [];
  /**
   * Relevant user role
   */
  public role = '';

  /**
   * Keeps all subscriptions
   */
  private subscription: Subscription = new Subscription();
  /**
   * Current user id and roles
   */
  private user: {
    globalRole: string,
    projectRole?: string,
    id: string
  };

  /**
   * Sets the datasource and subscribes to the route
   *
   * @param router Used to get the current route and update it
   */
  constructor(
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService
  ) {
    this.user = {
      globalRole: 'common',
      id: '',
    };
    this.setRole();
  }

  ngOnInit(): void {
    this.setDatasource();
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setDatasource();
        }
      })
    );

    // Gets relevant roles for user, used for the higlight feature
    this.subscription.add(
      this.authService.currentUser.subscribe((user: any) => {
        if (user.role && (user._id || user.username)) {
          if (user._id !== this.user.id) {
            delete this.user.projectRole;
          }
          this.user.globalRole = user.role;
          this.user.id = user._id || user.username;
          this.setRole();
        }
      })
    );
    this.subscription.add(
      this.projectService.project.subscribe(project => {
        if (project.users) {
          const projectUser = project.users.find(user => user.id === this.user.id || user.username === this.user.id);
          if (projectUser) {
            this.user.projectRole = projectUser.role;
            this.setRole();
          }
        }
      })
    );
  }

  /**
   * Sets the datasource and users for the rights table
   */
  private setDatasource(): void {
    if (this.insideProject()) {
      this.dataSource = HintUserDataProject;
      this.users = HintUsersProject;
    } else {
      this.dataSource = HintUserData;
      this.users = HintUsers;
    }
  }

  /**
   * Sets the relevant role for the user
   */
  private setRole(): void {
    this.role = this.insideProject() ?
      this.user.projectRole || (this.user.globalRole === 'common' ? 'read' : 'owner') :
      this.user.globalRole;
  }

  /**
   * Checks if the current route is inside a project
   *
   * @returns Boolean indicating if the route is inside a project
   */
  public insideProject(): boolean {
    return this.type ? this.type === 'project' : this.router.url.includes('project:');
  }

  /**
   * Unsubscribes from all subscriptions
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
