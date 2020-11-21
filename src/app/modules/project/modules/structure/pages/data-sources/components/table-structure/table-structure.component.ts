import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-table-structure',
  templateUrl: './table-structure.component.html',
  styleUrls: ['./table-structure.component.scss']
})
export class TableStructureComponent implements OnInit {



  @Input() tableStructure : number = 0;
  @Input() visualize = true;
  @Output() chosenStructure = new EventEmitter<number>();

  project : Project;
  floatLabelControl = new FormControl('0');

  partitions : any;
  chosenValue: string;


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.partitions = project.forms[0].elements[0].partitions;
      //TODO distribution === table structure
    });

  }

  selected(event) {
    this.chosenStructure.emit(event.value);
  }

  reorderPartitions(event, name) {
      const indexNew = this.partitions.findIndex(element => element.id === event.value);
      const indexOld = this.partitions.findIndex(element => element.id === name);
      var old = this.partitions[indexOld];
      this.partitions[indexOld] = this.partitions[indexNew]
      this.partitions[indexNew] = old;
  }

  getNumber(number) {
    if (number) {
      return new Array(parseInt(number));   
    } 
  }

  toNumber(i) {
    return parseInt(i);
  }

  getIndex(x) {
    return parseInt((this.partitions.length)-this.toNumber(this.tableStructure)+x)
  }

}
