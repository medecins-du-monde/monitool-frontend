import { Component, OnInit } from '@angular/core';
import { Indicator } from 'src/app/models/indicator';
import { indicatorsList } from 'src/app/constants/indicators';
import { themes } from 'src/app/constants/themes';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  indicatorsCrCo: Indicator[];
  indicatorsMGR: Indicator[];
  indicatorsRdR: Indicator[];
  indicatorsSSR: Indicator[];
  indicatorsMT: Indicator[];
  constructor() {
    this.indicatorsCrCo = indicatorsList.filter(indicator => indicator.themes.length === 1 &&
      themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('CrCo'));
    this.indicatorsMGR = indicatorsList.filter(indicator => indicator.themes.length === 1 &&
      themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('MGR'));
    this.indicatorsRdR = indicatorsList.filter(indicator => indicator.themes.length === 1 &&
      themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('RdR'));
    this.indicatorsSSR = indicatorsList.filter(indicator => indicator.themes.length === 1 &&
      themes.find(t => t._id === indicator.themes[0]).shortName.fr.startsWith('SSR'));
    this.indicatorsMT = indicatorsList.filter(indicator => indicator.themes.length > 1);
  }


  ngOnInit(): void {
  }

}
