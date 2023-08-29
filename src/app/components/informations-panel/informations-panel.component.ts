import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-informations-panel',
  templateUrl: './informations-panel.component.html',
  styleUrls: ['./informations-panel.component.scss']
})
export class InformationsPanelComponent implements OnInit, OnDestroy {

  displayed = false;
  firstDisplayed = true;
  informations: InformationItem[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService,
              private domSanitizer: DomSanitizer,
              private translateService: TranslateService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.displayed = this.userService.displayInfoPanel.value;

    this.subscription.add(
      this.projectService.panelInformations.subscribe(val => {
        this.informations = val;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
