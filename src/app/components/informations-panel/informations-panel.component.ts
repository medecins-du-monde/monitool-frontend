import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-informations-panel',
  templateUrl: './informations-panel.component.html',
  styleUrls: ['./informations-panel.component.scss']
})
export class InformationsPanelComponent implements OnInit {

  displayed = false;
  firstDisplayed = false;
  informations: InformationItem[] = [];

  constructor(private projectService: ProjectService, private domSanitizer: DomSanitizer, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.projectService.panelInformations.subscribe(val => {
      this.informations = val;
    });
  }

  toggleDisplay() {
    this.firstDisplayed = true;
    this.displayed = !this.displayed;
  }

  closeDisplay() {
    if (this.displayed) {
      this.displayed = false;
    }
  }

  // We need the domSanitizer so that angular will display html tags in innerHTML
  transform(value) {
    let translatedText = '';
    this.translateService.get(value).subscribe((res: string) => {
        translatedText = res;
    });
    return this.domSanitizer.bypassSecurityTrustHtml(translatedText);
  }

}
