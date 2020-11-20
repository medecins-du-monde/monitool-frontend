import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-structure',
  templateUrl: './table-structure.component.html',
  styleUrls: ['./table-structure.component.scss']
})
export class TableStructureComponent implements OnInit {


  @Input() tableStructure : string;
  project : Project;
  @Input() visualize = true;
  partitions : any;
  chosenValue: string;


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.partitions = project.forms[0].elements[0].partitions;
      //TODO distribution === table structure
      //maybe need only element form
    });

  }

  structure(structure : string) {
    if (this.tableStructure === structure ) {
      return true;
    } 
    return false;
  }

  reorderPartitions(name) {
      const indexNew = this.partitions.findIndex(element => element.id === this.chosenValue);
      const indexOld = this.partitions.findIndex(element => element.id === name);
      var old = this.partitions[indexOld];
      this.partitions[indexOld] = this.partitions[indexNew]
      this.partitions[indexNew] = old;
  }

}
