import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
import { isEmpty } from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

  /* CHART COMPONENT
    required Input:
      - chartType (see below)
      - data: {
          labels: string[], (y-axis ticks)
          datasets: [{
            label: string, (shown in legend)
            data: number of datapoints,
            borderColor: 'rgba(x,y,z,w)',
            backgroundColor: 'rgba(x,y,z,w)', (optional),
            fill: boolean
          }]
      - options: https://www.chartjs.org/docs/latest/getting-started/usage.html
      }
  */

  private chart;

  @Input() options: any;
  @Input() data: any;

  /* which chart to choose from should always depend on the datatype */
  chartTypes = [
    {value: 'bar', viewValue: 'Bar Chart'}, // 1 quantitative and 1 nominative value, good to compare amounts
    {value: 'line', viewValue: 'Line Chart'}, // 2 quantitative values, good for trends, proccesses and time series
    {value: 'bubble', viewValue: 'Bubble Plot'}, // 3 quantitative values, good for comparing multi-dimensional data
    {value: 'scatter', viewValue: 'Scatter Plot'}, // 2 quantitative values, good to show distributions when a lot of data is available
    {value: 'radar', viewValue: 'Radar Plot'}, // 3 or more quantitative values, good to compare datasets with few values
    {value: 'doughnut', viewValue: 'Doughnut '}, // quantitative proportion of data, only recommended when little data
    {value: 'pie', viewValue: 'Pie Chart'}, // quantitative proportion of data, only recommended when little data
    {value: 'polarArea', viewValue: 'Polar Area'}, // quantitative proportion of data also shown in size, only recommended when little data
  ];

  private subscription: Subscription = new Subscription();
  
  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chart = new Chart('currentChart', {
      type: this.chartService.type.value,
      data: this.data,
      options: this.options,
    });

    this.subscription.add(
      this.chartService.currentData.subscribe(data => {
        if (!isEmpty(data)) {
          this.addData(data);
        }
      })
    );

    this.subscription.add(
      this.chartService.currentType.subscribe(type => {
        if (!isEmpty(type)) {
          this.changeChartType(type);
        }
      })
    );
  }


  addData(data) {
    if (this.chart){
      this.chart.data = data;
      this.chart.update();
    }
    this.data = data;
  }

  clearGraph() {
    this.chart.data.datasets = [];
    this.chart.update();
  }

  changeChartType(type) {
    if (this.chart){
      // TODO: Understand why chart destroy and not update
      this.chart.destroy();
      // this.chart.update();
    }
    this.chart = new Chart('currentChart', {
      type,
      data: this.data,
      options: this.options,
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
