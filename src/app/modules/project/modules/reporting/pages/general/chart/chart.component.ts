import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  private options =  {fill: false};
  private labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Me'];
  private data = {
    labels: this.labels,
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 25],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
    }]
  }
  private chart;


  ngOnInit(): void {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: this.data,
      options: this.options,
  });
  }

  addGraph() {
    const tempData = [];

    for (let i = 0; i < this.labels.length; ++i) {
      tempData.push(this.randomNumberLimit(30));
    }

    let temp = {
      label: '# of Votes',
      data: tempData,
      borderColor: this.randomColor(),
      fill: false,
    };

    this.data.datasets.push(temp);
    this.chart.update();
  }

  randomNumberLimit(limit) {
    return Math.floor((Math.random() * limit) + 1);
  }

  randomColor() {
    const col = 'rgba(' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255) + '1)';

    console.log(col);
    return col;
  }

}
