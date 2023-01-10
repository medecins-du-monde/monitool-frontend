import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DownloadService } from 'src/app/services/download.service';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-download-excel-page',
  templateUrl: './download-excel-page.component.html',
  styleUrls: ['./download-excel-page.component.scss']
})
export class DownloadExcelPageComponent implements OnInit, OnDestroy {

  pageText = 'Something went wrong';
  informations = [];
  mini = false;

  get status(): string{
    return this.downloadService.status.getValue();
  }

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private downloadService: DownloadService,
    private reportingService: ReportingService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.projectService.updateInformationPanel(this.informations);

    if (this.router.url.indexOf('api_export_project') >= 0) {
      const downloadRoute = this.router.url.slice(this.router.url.indexOf('api_export_project'), this.router.url.length);
      this.downloadService.url.next('/' + downloadRoute.replace(/[_]/g, '/'));

      this.subscription.add(
        this.downloadService.url.subscribe(() => {
          if (this.downloadService.url.getValue() !== ''){
            this.pageText = 'Generating excel sheet, please wait...';
          }
          this.downloadService.generate();
        })
      );
    } else if (this.router.url.indexOf('export_current_view') >= 0) {
      // get param from url after /export_current_view
      const id = this.router.url.slice(this.router.url.indexOf('export_current_view') + 20, this.router.url.length);
      this.pageText = 'Generating excel sheet, please wait...';
      try {
        await this.reportingService.downloadSavedTableView(id);
        this.pageText = 'Excel sheet generated, downloading...';
      } catch (error) {
        this.pageText = 'Something went wrong';
      } 
    }
  }

  download(): void {
    this.downloadService.download();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
