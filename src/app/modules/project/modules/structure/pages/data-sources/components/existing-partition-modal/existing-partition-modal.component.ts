import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-existing-partition-modal',
  templateUrl: './existing-partition-modal.component.html',
  styleUrls: ['./existing-partition-modal.component.scss']
})
export class ExistingPartitionModalComponent implements OnInit, OnDestroy {
  project: Project;
  allPartitions: Partition[]
  private subscription: Subscription = new Subscription();

  get element(): FormElement{
    return this.data.value;
  }
  constructor(
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) { 
    console.log(this.data);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) =>{
        this.project = project;
        this.createOptions();
        console.log(this.allPartitions);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  createOptions(): void {
    this.allPartitions = [];
    if (this.project){
      for (const form of this.project.forms){
        for (const element of form.elements){
          if (element.id !== this.element.id){
            for (const partition of element.partitions){
              this.allPartitions.push(partition);
            }
          }
        }
      }
    }
  }

}
