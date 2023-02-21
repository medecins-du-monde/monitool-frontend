import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { isEmpty } from 'lodash';
import { Subscription } from 'rxjs';
import Chart, { ChartOptions } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { TranslateService } from '@ngx-translate/core';

const BASELINE_LABEL = {
  borderColor: 'rgba(0, 0, 0, .3)',
  backgroundColor: 'white',
  label: 'Baseline',
  borderDash: [2, 4.62],
  borderWidth: 2
};

const TARGET_LABEL = {
  borderColor: 'rgba(0, 0, 0, .3)',
  backgroundColor: 'white',
  label: 'Target',
  borderDash: [9.5, 5.9],
  borderWidth: 2
};

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

  public selectedBaselines: any[] = [];
  public selectedTargets: any[] = [];

  public availableBaselines: any[] = [];
  public availableTargets: any[] = [];


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

    annotation: {
      annotations: []
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
        }],
    },
  } as ChartOptions;

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

  constructor(private chartService: ChartService, private translate: TranslateService) {
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
              let formattedValue = 'NaN';
              if (value.indexOf('%') !== -1) {
                formattedValue = parseFloat(parseFloat(value.replace(',', '.')).toFixed(1)).toString().replace('.', ',') + '%';
              } else {
                formattedValue = Number(value.replace('null', '').replace(',', '.').replace(/\s/g, '')).toLocaleString('de-DE');
              }
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
      plugins: [ChartAnnotation]
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

      // Setup targets and baselines
      this.availableBaselines = [];
      const previousSelectedBaselines = [...this.selectedBaselines];
      this.selectedBaselines = [];
      this.availableTargets = [];
      const previousSelectedTargets = [...this.selectedTargets];
      this.selectedTargets = [];
      (this.chart.options as any).annotation.annotations = [];

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
        this.setBaseline(dataGroup, previousSelectedBaselines);
        this.setTarget(dataGroup, previousSelectedTargets);
      });
      this.chart.options.scales.yAxes = this.getYAxes({onlyPercentages, higherPercentages});
      this.loadLabels(data);
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
      plugins: [
        ChartAnnotation,
        {
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
    // Gets max a min values of baselines/targets and uses them to set the max/min values of Y axes
    let maxAValue = 0;
    let minAValue = 0;
    let maxBValue = 100;
    let minBValue = 0;

    this.selectedBaselines.map(baseline => {
      if (baseline.scaleID === 'A') {
        minAValue = minAValue > baseline.value ? baseline.value : minAValue;
        maxAValue = maxAValue < baseline.value ? baseline.value : maxAValue;
      } else {
        minBValue = minBValue > baseline.value ? baseline.value : minBValue;
        maxBValue = maxBValue < baseline.value ? baseline.value : maxBValue;
      }
    });
    this.selectedTargets.map(baseline => {
      if (baseline.scaleID === 'A') {
        minAValue = minAValue > baseline.value ? baseline.value : minAValue;
        maxAValue = maxAValue < baseline.value ? baseline.value : maxAValue;
      } else {
        minBValue = minBValue > baseline.value ? baseline.value : minBValue;
        maxBValue = maxBValue < baseline.value ? baseline.value : maxBValue;
      }
    });


    return [{
        id: 'A',
        display: 'auto',
        ticks: {
          fontSize: 14,
          beginAtZero : true,
          suggestedMax: maxAValue,
          suggestedMin: minAValue
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
          suggestedMax: maxBValue,
          suggestedMin: minBValue,
          callback: (val) => {
            return val + (options?.higherPercentages ? '‰' : '%');
          },
        }
      }
    ];
  }

  private setBaseline(data: any, selectedBaselines: any[]): void {
    if (typeof(data.baseline) === 'number') {
      const baseline = {
        type: 'line',
        mode: 'horizontal',
        scaleID: data.yAxisID,
        value: data.baseline,
        borderColor: data.borderColor,
        borderWidth: 2,
        borderDash: [3, 5],
        label: data.label
      };
      this.availableBaselines.push(baseline);
      if (selectedBaselines.find(el =>  JSON.stringify(el) === JSON.stringify(baseline))) {
        (this.chart.options as any).annotation.annotations.push(baseline);
        this.selectedBaselines.push(baseline);
      }
    }
  }

  private setTarget(data: any, selectedTargets: any[]): void {
    if (typeof(data.target) === 'number') {
      const target = {
        type: 'line',
        mode: 'horizontal',
        scaleID: data.yAxisID,
        value: data.target,
        borderColor: data.borderColor,
        borderWidth: 2,
        borderDash: [12, 10],
        label: data.label
      };
      this.availableTargets.push(target);
      if (selectedTargets.find(el =>  JSON.stringify(el) === JSON.stringify(target))) {
        (this.chart.options as any).annotation.annotations.push(target);
        this.selectedTargets.push(target);
      }
    }
  }

  public loadAnnotations(): void {
    this.addData(this.data);
  }

  private loadLabels(data: any) {

    for (let i = data.datasets.length - 1; i >= 0; i--) {
      if (
        data.datasets[i].borderColor === 'rgba(0, 0, 0, .3)' &&
        data.datasets[i].backgroundColor === 'white' ) {
          data.datasets.splice(i, 1);
      }
    }

    if (this.selectedBaselines.length > 0) {
      data.datasets.push({
        ...BASELINE_LABEL,
        unit: data.datasets[0].unit,
        yAxisID: data.datasets[0].yAxisID,
        label: this.translate.instant(BASELINE_LABEL.label)
      });
    }

    if (this.selectedTargets.length > 0) {
      data.datasets.push({
        ...TARGET_LABEL,
        unit: data.datasets[0].unit,
        yAxisID: data.datasets[0].yAxisID,
        label: this.translate.instant(TARGET_LABEL.label)
      });
    }
  }

  get downloadChart(): string{
    return this.chart.toBase64Image();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
