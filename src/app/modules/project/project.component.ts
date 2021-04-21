// tslint:disable: no-string-literal
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewChecked {

  public sidenav: Sidenav;
  project: Project;
  user: User;
  projectUser = [];

  bigPage: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: ProjectService,
    private sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.projectUser = [];
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.authService.currentUser.subscribe((user: User) => {
        this.user = user;
      });
      this.sidenavService.sidenavData.subscribe( (sidenav: Sidenav) => this.sidenav = sidenav );
      this.projectService.get(projectId).then((project: Project) => {
        this.projectService.inBigPage.subscribe(value => this.bigPage = value);
        this.project = project;
        this.sidenavService.generateSidenav(this.user, this.project);
      });
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
