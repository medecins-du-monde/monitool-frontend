import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

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

  @Input() options: object;
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

  ngOnInit(): void {
    this.chart = new Chart('currentChart', {
      type: this.chartService.type.value,
      data: this.data,
      options: this.options,
    });

    this.chartService.dataset.subscribe(data => {
      if (!isEmpty(data)) {
        this.addDataset(data);
      }
    });

    this.chartService.data.subscribe(data => {
      if (!isEmpty(data)) {
        this.addData(data);
      }
    });

    this.chartService.type.subscribe(type => {
      if (!isEmpty(type)) {
        this.changeChartType(type);
      }
    });
  }

  addDataset(data) {
    if (this.chart){
      this.chart.data.datasets.push(data.datasets);
      this.chart.update();
    }
    this.data.datasets.push(data.datasets);
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

  changeChartType(event) {
    if (this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart('currentChart', {
      type: event,
      data: this.data,
      options: this.options,
    });
  }

  constructor(private chartService: ChartService) { }

  // delete all functions below later - only for populating with random data//
  // addRandomData() {
  //   const tempData = [];
  //   for (let i = 0; i < this.chart.data.labels.length; ++i) {
  //     tempData.push(this.randomNumberLimit(30));
  //   }

  //   const chartColor =  this.randomColor();
  //   const temp = {
  //     label: '# of Votes',
  //     data: tempData,
  //     borderColor: chartColor,
  //     backgroundColor: chartColor,
  //     fill: false,
  //   };

  //   this.chart.data.datasets.push(temp);
  //   this.chart.update();
  // }

  // randomNumberLimit(limit) {
  //   return Math.floor((Math.random() * limit) + 1);
  // }

  // randomColor() {
  //   const col = 'rgba(' + this.randomNumberLimit(255)
  //     + ',' + this.randomNumberLimit(255)
  //     + ',' + this.randomNumberLimit(255) + '1)';
  //   return col;
  // }
}