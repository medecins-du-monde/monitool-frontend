import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-informations-panel',
  templateUrl: './informations-panel.component.html',
  styleUrls: ['./informations-panel.component.scss']
})
export class InformationsPanelComponent implements OnInit {

  displayed: boolean = false;
  firstDisplayed: boolean = false;
  informations: InformationItem[] = [];
  informationIntro: InformationIntro;

  constructor(private projectService: ProjectService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.projectService.informationsContent.subscribe(val => {
      this.informations = val;
    });
    this.projectService.informationIntroContent.subscribe(val => {
      this.informationIntro = val;
    })
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

  transform(value) {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
