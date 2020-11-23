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
  @Input() tableStructure = 0;
  @Input() visualize = true;
  @Output() chosenStructure = new EventEmitter<number>();

  project: Project;
  floatLabelControl = new FormControl('0');

  partitions : any;
  // oldPartitions: any;
  chosenValue: string;

  constructor(private projectService: ProjectService) { }


  getNumber(length) {
    if (length) {
      return new Array(this.toNumber(length));
    }
  }

  getIndex(x) {
    const index = this.toNumber((this.partitions.length) - this.toNumber(this.tableStructure) + x);
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

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.project.forms.filter(element => element.elements.filter(x => {
        if (x.id === this.elementForm.value.id) {
          this.partitions = x.partitions;
        }
      }));
    });
  }


  reorderPartitions(nextId, currentRowIndex) {
    const partitions = this.elementForm.value.partitions;
    const nextIndex = partitions.findIndex(element => element.id === nextId);
    const oldElement = partitions[currentRowIndex];
    partitions[currentRowIndex] = partitions[nextIndex];
    partitions[nextIndex] = oldElement;
    this.elementForm.controls.partitions.patchValue(partitions);
  }

  selected(event) {
    this.chosenStructure.emit(event.value);
    this.elementForm.value.distribution = event.value;
  }

  toNumber(i) {
    return parseInt(i, 10);
  }


}
