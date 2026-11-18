import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() sidenav: Sidenav;
  @Input() structurePage: boolean;

  public activeGroup: string;
  public enableAllSidenavLink: boolean;
  // Tooltips open beside the menu, except on mobile where the menu takes the full width ($breakpoint-sm)
  public tooltipPosition: TooltipPosition = 'right';

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // Enable all the links of the sidenav if the project has all is basicsinfos
    this.subscription.add(
      this.projectService.hasBasicsInfos.subscribe(val => {
        this.enableAllSidenavLink = this.structurePage ? val : true;
      })
    );
    this.subscription.add(
      this.breakpointObserver.observe('(max-width: 1023px)').subscribe(state => {
        this.tooltipPosition = state.matches ? 'below' : 'right';
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
