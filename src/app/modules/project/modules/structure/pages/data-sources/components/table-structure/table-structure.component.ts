import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/classes/project.model';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-table-structure',
  templateUrl: './table-structure.component.html',
  styleUrls: ['./table-structure.component.scss']
})
export class TableStructureComponent implements OnInit, OnDestroy {

  @Input() elementForm: FormGroup;
  @Input() tableStructure;
  @Input() visualize = true;
  @Output() chosenStructure = new EventEmitter<number>();

  project: Project;
  floatLabelControl = new FormControl();

  partitions: any[] = [];

  savedStructure: number;

  private subscription: Subscription = new Subscription();

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

  getTopValue(index: number) {
    return index + this.toNumber(this.tableStructure);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.project.forms.filter(element => element.elements.filter(x => {
          if (x.id === this.elementForm.value.id) {
            this.partitions = x.partitions;
            this.savedStructure = x.distribution ? x.distribution : 0;
          }
        }));
      })
    );
  }

  // swaps the form controls when the user reorder the partitions
  reorderPartitions(nextId, currentRowIndex: number) {
    const partitions = this.elementForm.value.partitions;
    const nextIndex = partitions.findIndex(element => element.id === nextId);

    // saves the control in currentRowIndex
    const oldControl = this.elementForm.get('partitions').get(currentRowIndex.toString());

    // overwrite the currentRowIndex with the control in the nextIndex position
    (this.elementForm.get('partitions') as FormArray).setControl(
      currentRowIndex,
      this.elementForm.get('partitions').get(nextIndex.toString())
    );

    // overwrite the control in the nextIndex position with the saved control
    (this.elementForm.get('partitions') as FormArray).setControl(
      nextIndex,
      oldControl
    );
  }

  selected(event) {
    this.chosenStructure.emit(event.value);
    const y: number = +event.value;
    this.elementForm.value.distribution = y;
  }

  toNumber(i) {
    return parseInt(i, 10);
  }

  isCurrent(i) {
    return i === this.savedStructure;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
