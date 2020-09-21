import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Indicator } from 'src/app/models/indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';


@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[];

  constructor(
    private indicatorService: IndicatorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getIndicators();
  }

  private getIndicators() {
    this.indicatorService.list().then((res: Indicator[]) => {
      this.indicators = res;
    });
  }

}
