import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme';
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
  crco: Theme;
  mgr: Theme;
  rdr: Theme;
  ssr: Theme;

  constructor() {
    this.crco = themes.find(t => t.shortName.fr === 'CrCo');
    this.mgr  = themes.find(t => t.shortName.fr === 'MGR');
    this.rdr  = themes.find(t => t.shortName.fr === 'RdR');
    this.ssr  = themes.find(t => t.shortName.fr === 'SSR');
    this.indicators.push({
      thematic: {
        en: this.crco.shortName.en + ': ' + this.crco.name.en,
        fr: this.crco.shortName.fr + ': ' + this.crco.name.fr,
        es: this.crco.shortName.es + ': ' + this.crco.name.es
      },
      indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('CrCo'))
    });
    this.indicators.push({
      thematic: {
        en: this.mgr.shortName.en + ': ' + this.mgr.name.en,
        fr: this.mgr.shortName.fr + ': ' + this.mgr.name.fr,
        es: this.mgr.shortName.es + ': ' + this.mgr.name.es
      },
      indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('MGR'))
    });
    this.indicators.push({
      thematic: {
        en: this.rdr.shortName.en + ': ' + this.rdr.name.en,
        fr: this.rdr.shortName.fr + ': ' + this.rdr.name.fr,
        es: this.rdr.shortName.es + ': ' + this.rdr.name.es
      },
      indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('RdR'))
    });
    this.indicators.push({
      thematic: {
        en: this.ssr.shortName.en + ': ' + this.ssr.name.en,
        fr: this.ssr.shortName.fr + ': ' + this.ssr.name.fr,
        es: this.ssr.shortName.es + ': ' + this.ssr.name.es
      },
      indicators: indicatorsList.filter(indicator => indicator.themes.length === 1 &&
        themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('SSR'))
    });
    this.indicators.push({
      thematic: {
        en: 'Multi-thematic',
        fr: 'Multi-thématique',
        es: 'Multitemático'
      },
      indicators: indicatorsList.filter(indicator => indicator.themes.length > 1)
    });
  }


  ngOnInit(): void {
  }

}
