import { Component, OnInit, Input } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: Sidenav;

  public activeGroup: string;
  public enableAllSidenavLink: boolean;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    //Check whether or not the project has its basics infos
    this.projectService.hasBasicsInfos.subscribe(val => {
      this.enableAllSidenavLink = val;
      this.sidenav.groups.map(group => {
        if (group.title === 'Input' || group.title === 'Reporting') {
          group.collapsible = val;
          group.disable = !val;
          group.items.map(item => {
            item.disable = !val;
          })
        } else {
          group.items.map(item => {
            if (item.name !== 'Home' && item.name !== 'Basics') {
              item.disable = !val;
            }
          });
        }
      });
    });
    this.activeGroup = this.sidenav.groups.length > 0 ? this.sidenav.groups[0].title : '';
  }

  public openGroup(title: string): void {
    if (!this.enableAllSidenavLink) {
      if (title !== 'Structure') {
        this.activeGroup = 'Structure';
      } else {
        this.activeGroup = (this.activeGroup === title) ? null : title;;
      }
    } else {
      this.activeGroup = (this.activeGroup === title) ? null : title;
    }
  }

}
