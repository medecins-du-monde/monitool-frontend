import { Component, OnInit } from '@angular/core';
import { IndicatorsGroup } from 'src/app/models/indicators-group';
import { indicatorsList } from 'src/app/constants/indicators';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  indicators: IndicatorsGroup[];

  constructor() {
    this.indicators = indicatorsList;
  }

  ngOnInit(): void {
  }

}
