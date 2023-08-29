import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
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

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // Enable all the links of the sidenav if the project has all is basicsinfos
    this.subscription.add(
      this.projectService.hasBasicsInfos.subscribe(val => {
        this.enableAllSidenavLink = this.structurePage ? val : true;
      })
    );
    this.activeGroup = this.sidenav.groups.length > 0 ? this.sidenav.groups[0].title : '';
  }

  public openGroup(title: string): void {
    if (this.enableAllSidenavLink) {
      this.activeGroup = (this.activeGroup === title) ? null : title;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
