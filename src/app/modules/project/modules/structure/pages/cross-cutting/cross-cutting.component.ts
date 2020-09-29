import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';
import { Project } from 'src/app/models/project.model';
import { Theme } from 'src/app/models/theme.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-cross-cutting',
  templateUrl: './cross-cutting.component.html',
  styleUrls: ['./cross-cutting.component.scss']
})
export class CrossCuttingComponent implements OnInit {

  indicators: Indicator[] = [];

  groups: { theme: Theme, indicators: Indicator[]}[] = [];

  multiThemesIndicators: Indicator[] = [];

  crossCutting: any = {};

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private indicatorService: IndicatorService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.crossCutting = project.crossCutting;
      this.indicatorService.list().then((indicators: Indicator[]) => {
        console.log(indicators);
        console.log(this.crossCutting);
        this.indicators = indicators;
        this.groups = [];
        this.multiThemesIndicators = [];
        this.indicators.forEach(x => {
          if (x.multiThemes) {
            this.multiThemesIndicators.push(x);
          } else {
            const group = this.groups.find(g => g.theme.id === x.themes[0].id );
            if ( group ) {
              group.indicators.push(x);
            } else {
              this.groups.push({ theme: x.themes[0], indicators: [x] });
            }
          }
        });
      });
    });
  }

}
