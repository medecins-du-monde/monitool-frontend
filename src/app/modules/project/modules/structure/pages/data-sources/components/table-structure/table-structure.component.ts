import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Partition } from 'src/app/models/partition.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-table-structure',
  templateUrl: './table-structure.component.html',
  styleUrls: ['./table-structure.component.scss']
})
export class TableStructureComponent implements OnInit {


  @Input() elementForm: FormGroup;
  @Input() tableStructure : number = 0;
  @Input() visualize = true;
  @Output() chosenStructure = new EventEmitter<number>();

  project : Project;
  floatLabelControl = new FormControl('0');

  partitions : any;
  oldPartitions: any;
  chosenValue: string;


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.project.forms.filter(element => element.elements.filter(x => {
        if (x.id === this.elementForm.value.id) {
          this.partitions = x.partitions;
        }
      }));
      this.oldPartitions = this.partitions.map(partitionObject => new Partition(partitionObject));
    });


  }

  selected(event) {
    this.chosenStructure.emit(event.value);
  }

  reorderPartitions(nextId, currentRowIndex) {
    console.log(this.partitions);
    const indexNew = this.oldPartitions.findIndex(element => element.id === nextId);
    var old = this.oldPartitions[currentRowIndex];
    this.oldPartitions[currentRowIndex] = this.oldPartitions[indexNew]
    this.oldPartitions[indexNew] = old;
    this.partitions = this.oldPartitions.map(partitionObject => new Partition(partitionObject));

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
    const index = parseInt((this.partitions.length)-this.toNumber(this.tableStructure)+x);
    return index;
  }

  getLength(p) {
    let total = 1;
    p.forEach(x => {
      if (x.elements.length > 0) {
        total *= x.elements.length;
      }
    });
    return total;
  }

}
