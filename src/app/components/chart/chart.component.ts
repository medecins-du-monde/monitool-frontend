import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { isEmpty } from 'lodash';
import { Subscription } from 'rxjs';
import Chart, { ChartOptions } from 'chart.js';


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

  private chart: Chart;

  @Input() data: any;
  unit: string;
  options: ChartOptions = {

    // makes the chart look better with fixed height and width
    maintainAspectRatio: false,

    // change fontSize of the legends in the top of the chart
    legend: {
      labels: {
          fontSize: 14
      }
    },

    scales: {
      // change fontSize of the labels in the xAxis
      xAxes: [{
          ticks: {
              fontSize: 14
          }
      }],
      // change fontSize of the labels in the yAxis
      yAxes: [{
        id: 'A',
        display: false
      }, {
        id: 'B',
        display: false,
      }
    ],
  }
  };

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

  constructor(private chartService: ChartService) {
    this.options.tooltips = {
      mode: 'index',
      intersect: false,

      enabled: false,

      callbacks: {
        label: (context) => {
          return context.label + ': ' + (+context.value).toLocaleString('fr-FR') + this.data.datasets[context.datasetIndex].unit;
        }
      },

      custom: (tooltipModel: any): void => {
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = '<tbody>';

          titleLines.forEach(title => {
              innerHtml += '<tr id="title-row"><th colspan="2">' + title + '</th></tr>';
          });

          bodyLines.forEach((body, i) => {
              const colors = tooltipModel.labelColors[i];
              // these two color are swapped
              let style = 'background:' + colors.borderColor + ' !important';
              style += '; border-color:' + colors.backgroundColor + ' !important';

              style += '; border-width: 2px';
              style += '; width: 14px';
              style += '; height: 14px';
              style += '; margin-right: 6px';
              style += '; z-index: 0';

              const span = '<div style="' + style + '"> </div>';

              const name = body[0].split(':')[0];
              const value = body[0].split(':')[1];
              const formattedValue = value.indexOf('%') === -1 ? Number(value.replace(/\s/g, '')).toLocaleString('de-DE') : value;
              innerHtml += '<tr><td style="display: flex;">' + span + name + '</td><td class="dashed">' + formattedValue + '</td></tr>';

          });
          innerHtml += '</tbody>';

          const tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        // `this` will be the overall tooltip
        const position = this.chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + (0.85 * tooltipModel.caretX) + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.marginRight = '30px';
        tooltipEl.style.pointerEvents = 'none';
        return;
      }
    };
   }

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


  addData(data): void {
    if (this.chart){
      let onlyPercentages = true;
      let higherPercentages = false;
      data.datasets.map(dataGroup => {
        if (dataGroup.unit === '%' || dataGroup.unit === '‰') {
          dataGroup.yAxisID = 'B';
          if (dataGroup.unit === '‰') {
            higherPercentages = true;
          }
        } else {
          onlyPercentages = false;
          dataGroup.yAxisID = 'A';
        }
      });
      this.chart.options.scales.yAxes = this.getYAxes({onlyPercentages, higherPercentages});
      this.chart.data = data;
      this.chart.update();
    }
    this.data = data;
  }

  resetCharts(): void {
    this.chart.data.datasets = [];
    this.chart.update();
    this.chartService.reset.next(true);
  }

  changeChartType(type: string): void {
    if (this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart('currentChart', {
      type,
      data: this.data,
      options: this.options,
      plugins: [{
        afterRender: (c: Chart) => {
          const ctx = c.ctx;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.restore();
        }
      }]
    });
  }

  private getYAxes(options?: any): any {
    return [{
        id: 'A',
        display: 'auto',
        ticks: {
          fontSize: 14,
          beginAtZero : true,
        }
      }, {
        id: 'B',
        display: 'auto',
        position: options?.onlyPercentages ? 'left' : 'right',
        gridLines: {
          display: options?.onlyPercentages,
        },
        ticks: {
          fontSize: 14,
          beginAtZero : true,
          suggestedMax: 100,
          callback: (val) => {
            return val + (options?.higherPercentages ? '‰' : '%');
          },
        }
      }
    ];
  }

  get downloadChart(): string{
    return this.chart.toBase64Image();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
