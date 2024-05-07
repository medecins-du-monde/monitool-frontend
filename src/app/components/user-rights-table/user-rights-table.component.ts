import { Component, OnDestroy } from '@angular/core';
import { HintUserData, HintUsers } from 'src/app/mocked/hint-user-element.mocked';
import { HintUserData as HintUserDataProject, HintUsers as HintUsersProject } from 'src/app/mocked/hint-user-project-element.mocked';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-rights-table',
  templateUrl: './user-rights-table.component.html',
  styleUrls: ['./user-rights-table.component.scss']
})
export class UserRightsTableComponent implements OnDestroy {

  /**
   * Datasource for the rights table
   */
  public dataSource = [];
  /**
   * Table users
   */
  public users = [];

  /**
   * Keeps all subscriptions
   */
  private subscription: Subscription = new Subscription();

  /**
   * Sets the datasource and subscribes to the route
   *
   * @param router Used to get the current route and update it
   */
  constructor(
    private router: Router
  ) {
    this.setDatasource();
    this.subscription.add(
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setDatasource();
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
   * Checks if the current route is inside a project
   *
   * @returns Boolean indicating if the route is inside a project
   */
  public insideProject(): boolean {
    return this.router.url.includes('project:');
  }

  /**
   * Unsubscribes from all subscriptions
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
