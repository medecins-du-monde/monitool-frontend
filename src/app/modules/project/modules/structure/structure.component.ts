import { Component, OnInit } from '@angular/core';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.inBigPage.next(false);
  }

}
