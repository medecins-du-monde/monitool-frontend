import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-download-excel-page',
  templateUrl: './download-excel-page.component.html',
  styleUrls: ['./download-excel-page.component.scss']
})
export class DownloadExcelPageComponent implements OnInit {

  informations = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.updateInformationPanel(this.informations);
  }

}
