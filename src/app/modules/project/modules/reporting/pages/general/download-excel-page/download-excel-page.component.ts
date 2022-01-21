import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-download-excel-page',
  templateUrl: './download-excel-page.component.html',
  styleUrls: ['./download-excel-page.component.scss']
})
export class DownloadExcelPageComponent implements OnInit {

  informations = []; 
  mini = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectService.updateInformationPanel(this.informations);
    this.route.params.subscribe(params => {
      if (params.mini && params.mini === 'mini') {
        this.mini = true;
      }
    })
  }

}
