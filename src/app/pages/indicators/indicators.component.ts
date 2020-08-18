import { Component, OnInit } from '@angular/core';
import { Indicator } from 'src/app/models/indicator';
import { indicatorsList } from 'src/app/constants/indicators';

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
    this.indicatorsCrCo = indicatorsList.filter(indicator => indicator.thematic.startsWith('CrCo'));
    this.indicatorsMGR = indicatorsList.filter(indicator => indicator.thematic.startsWith('MGR'));
    this.indicatorsRdR = indicatorsList.filter(indicator => indicator.thematic.startsWith('RdR'));
    this.indicatorsSSR = indicatorsList.filter(indicator => indicator.thematic.startsWith('SSR'));
    this.indicatorsMT = indicatorsList.filter(indicator => indicator.thematic.startsWith('Multi'));
  }

  ngOnInit(): void {
  }

}
