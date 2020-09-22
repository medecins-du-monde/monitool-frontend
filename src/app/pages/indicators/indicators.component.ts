import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';
import { Project } from 'src/app/models/project.model';
import { Theme } from 'src/app/models/theme.model';
import { IndicatorService } from 'src/app/services/indicator.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[] = [];

  groups: { theme: Theme, indicators: Indicator[]}[] = [];

  multiThemesIndicators: Indicator[] = [];

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.indicatorService.list().then((indicators: Indicator[]) => {
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
  }

}
