import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';

/**
 * Custom plugin for having a white background on the charts
 */
const whiteBackgroundPlugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: any) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

const dataLabelsConfig = {
  backgroundColor: 'white',
  borderRadius: 100,
  align: 'right',
  formatter(value) {
    return value.y;
  }

};

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent {

  private chart: any;

  public options = {
    title: {
      text: '',
      display: false,
      position: 'top'
    },
    footnote: {
      text: '',
      display: false,
    },
    legend: {
      display: true,
      position: 'top'
    },
    scales: {
      xAxis: {
        display: true
      },
      yAxis: {
        display: true
      }
    },
    dataLabels: {
      display: false
    }
  };

  constructor(
    public dialogRef: MatDialogRef<DownloadModalComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    Chart.plugins.register(ChartDataLabels);
  }

  onExport(type: string): void {
    const options = JSON.parse(JSON.stringify(this.data.chart.config.options));
    options.title = {...options.title, ...this.options.title};
    options.title.text = this.options.title.text === '' ? this.data.name : this.options.title.text;
    options.legend = {...options.legend, ...this.options.legend};
    options.scales.xAxes.map(axe => {if (!this.options.scales.xAxis.display) { axe.display = false; }});
    options.scales.yAxes.map(axe => {if (!this.options.scales.yAxis.display) { axe.display = false; }});
    options.plugins.datalabels = {...dataLabelsConfig};
    if (!this.options.dataLabels.display) {
      options.plugins.datalabels.color = 'rgba(0, 0, 0, 0)';
      options.plugins.datalabels.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
    if (this.options.footnote.display) {
      options.scales.xAxes.push({
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: this.options.footnote.text === '' ?
            this.translateService.instant('export-graph-modal.footer-placeholder') :
            this.options.footnote.text,
          fontStyle: 'italic',
          align: 'end'
        }
      });
    }

    const chart = new Chart('chartToDownload', {
      type: this.data.chart.config.type,
      data: this.data.chart.config.data,
      options,
      plugins: [...this.data.chart.config.plugins, whiteBackgroundPlugin, ChartDataLabels]
    });

    setTimeout(() => {
      if (type === 'png') {
        const a = document.createElement('a');
        a.href = chart.toBase64Image();
        a.download = this.getFileName(type);
        a.click();
      } else if (type === 'pdf') {
        const canvas: any = document.getElementById('chartToDownload');
        const canvasImage = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(20);
        pdf.addImage(canvasImage, 'JPEG', 15, 15, 260, 130);
        pdf.save(this.getFileName(type));
      }
      chart.destroy();
      // this.dialogRef.close();
    }, 500);

  }

  getFileName(type: string): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const name = (this.data.name && this.data.name !== '') ? this.data.name : 'chart';

    return(name + '_' + dd + '-' + mm + '-' + yyyy + '.' + type);
  }

}
