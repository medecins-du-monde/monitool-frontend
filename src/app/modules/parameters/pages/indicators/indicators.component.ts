import { Component, OnInit } from '@angular/core';
import { indicatorsList } from 'src/app/constants/indicators';
import { Indicator } from '../../../../models/indicator';


@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  indicators: Indicator[];
  constructor() { }

  ngOnInit(): void {
    this.indicators = indicatorsList;
  }

}
