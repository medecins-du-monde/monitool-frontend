import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DownloadService } from 'src/app/services/download.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-download-excel-page',
  templateUrl: './download-excel-page.component.html',
  styleUrls: ['./download-excel-page.component.scss']
})
export class DownloadExcelPageComponent implements OnInit, OnDestroy {

  pageText = 'Something went wrong';
  informations = []; 
  mini = false;

  private subscription: Subscription = new Subscription();
  
  constructor(
    private projectService: ProjectService, 
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.projectService.updateInformationPanel(this.informations);

    this.subscription.add(
      this.downloadService.url.subscribe(() => {
        if (this.downloadService.url.getValue() !== ''){
          this.pageText = 'Generating excel sheet';
        }
        this.downloadService.generate();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
