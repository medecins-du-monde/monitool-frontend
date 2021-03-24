import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/classes/user.model';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: Sidenav;
  @Input() structurePage: boolean;

  public activeGroup: string;
  public enableAllSidenavLink: boolean;
  user: User;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.hasBasicsInfos.subscribe(val => {
      this.enableAllSidenavLink = this.structurePage ? val : true;
    });
    this.activeGroup = this.sidenav.groups.length > 0 ? this.sidenav.groups[0].title : '';
  }

  public openGroup(title: string): void {
    if (this.enableAllSidenavLink) {
      this.activeGroup = (this.activeGroup === title) ? null : title;
    }
  }

}
