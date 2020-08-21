import { Component, OnInit } from '@angular/core';
import { Indicator } from 'src/app/models/indicator';
import { indicatorsList } from 'src/app/constants/indicators';
import { themes } from 'src/app/constants/themes';
import { IndicatorsGroup } from 'src/app/models/indicators-group';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  indicators: IndicatorsGroup[] = [];

  constructor() {
    this.indicators.push({
      thematic: {
        en: themes.find(t => t.shortName.fr === 'CrCo').shortName.en + ': ' +
          themes.find(t => t.shortName.fr === 'CrCo').name.en, fr: themes.find(t => t.shortName.fr === 'CrCo').shortName.fr + ': ' +
            themes.find(t => t.shortName.fr === 'CrCo').name.fr, es: themes.find(t => t.shortName.fr === 'CrCo').shortName.es + ': ' +
              themes.find(t => t.shortName.fr === 'CrCo').name.es
      }, indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('CrCo'))
    });
    this.indicators.push({
      thematic: {
        en: themes.find(t => t.shortName.fr === 'MGR').shortName.en + ': ' +
          themes.find(t => t.shortName.fr === 'MGR').name.en, fr: themes.find(t => t.shortName.fr === 'MGR').shortName.fr + ': ' +
            themes.find(t => t.shortName.fr === 'MGR').name.fr, es: themes.find(t => t.shortName.fr === 'MGR').shortName.es + ': ' +
              themes.find(t => t.shortName.fr === 'MGR').name.es
      }, indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('MGR'))
    });
    this.indicators.push({
      thematic: {
        en: themes.find(t => t.shortName.fr === 'RdR').shortName.en + ': ' +
          themes.find(t => t.shortName.fr === 'RdR').name.en, fr: themes.find(t => t.shortName.fr === 'RdR').shortName.fr + ': ' +
            themes.find(t => t.shortName.fr === 'RdR').name.fr, es: themes.find(t => t.shortName.fr === 'RdR').shortName.es + ': ' +
              themes.find(t => t.shortName.fr === 'RdR').name.es
      }, indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('RdR'))
    });
    this.indicators.push({
      thematic: {
        en: themes.find(t => t.shortName.fr === 'SSR').shortName.en + ': ' +
          themes.find(t => t.shortName.fr === 'SSR').name.en, fr: themes.find(t => t.shortName.fr === 'SSR').shortName.fr + ': ' +
            themes.find(t => t.shortName.fr === 'SSR').name.fr, es: themes.find(t => t.shortName.fr === 'SSR').shortName.es + ': ' +
              themes.find(t => t.shortName.fr === 'SSR').name.es
      }, indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('SSR'))
    });
    this.indicators.push({
      thematic: {
        en: 'Multi-thematic', fr: 'Multi-thématique', es: 'Multitemático'
      }, indicators: indicatorsList.filter(indicator => indicator.themes.length > 1)
    });
  }


  ngOnInit(): void {
  }

}
