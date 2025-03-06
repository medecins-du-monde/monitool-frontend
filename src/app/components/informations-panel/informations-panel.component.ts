import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-informations-panel',
  templateUrl: './informations-panel.component.html',
  styleUrls: ['./informations-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InformationsPanelComponent implements OnInit, OnDestroy {

  displayed = false;
  firstDisplayed = true;
  informations: InformationItem[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService,
              private domSanitizer: DomSanitizer,
              private translateService: TranslateService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.displayed = this.userService.displayInfoPanel.value;

    this.subscription.add(
      this.projectService.panelInformations.subscribe(val => {
        this.informations = val;
      })
    );
    this.subscription.add(
      this.projectService.toggleDisplay
      .subscribe(() => {
        if (!this.displayed) {
          this.toggleDisplay();
        }
      })
    );
  }

  toggleDisplay(): void {
    this.firstDisplayed = true;
    this.displayed = !this.displayed;
    this.userService.closeInfoPanel(false);
  }

  closeDisplay(): void {
    if (this.displayed) {
      this.displayed = false;
    }
    this.userService.closeInfoPanel(false);
  }

  // We need the domSanitizer so that angular will display html tags in innerHTML
  transform(translatekey: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(this.translateService.instant(translatekey));
  }

  refreshCache(): void {
    localStorage.removeItem('appVersion');
    location.reload();
  }

  /**
   * Checks if the current route is inside a project
   *
   * @returns Boolean indicating if the route is inside a project
   */
  public insideProject(): boolean {
    return this.router.url.includes('project:');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
