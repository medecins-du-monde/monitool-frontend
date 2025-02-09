/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewChecked, OnDestroy {

  public sidenav: Sidenav;
  project: Project;
  user: User;
  projectUser = [];

  bigPage: boolean;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.projectUser = [];
    this.subscription.add(
      this.route.params.subscribe(params => {
        const projectId = params.id;
        this.subscription.add(
          this.authService.currentUser.subscribe((user: User) => {
            this.user = user;
          })
        );
        this.subscription.add(
          this.sidenavService.sidenavData.subscribe((sidenav: Sidenav) => this.sidenav = sidenav )
        );
        this.projectService.get(projectId).then((project: Project) => {
          this.subscription.add(
            this.projectService.inBigPage.subscribe(value => this.bigPage = value)
          );
          this.project = project;
          this.sidenavService.generateSidenav(this.user, this.project);
        });
      })
    );
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
