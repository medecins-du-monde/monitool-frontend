import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  partitionsForm: FormGroup;

  get element(): FormElement{
    return this.data.value;
  }

  get formElementPartitions(): FormArray{
    return this.data.get('partitions') as FormArray;
  }
  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExistingPartitionModalComponent>,
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
    this.partitionsForm = new FormGroup({});

    this.allPartitions = [];
    if (this.project){
      for (const form of this.project.forms){
        for (const element of form.elements){
          if (element.id !== this.element.id){
            for (const partition of element.partitions){
              this.allPartitions.push(partition);
              this.partitionsForm.addControl(partition.id, new FormControl(false));
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    console.log(this.partitionsForm.value);
    for (const partition of this.allPartitions){
      if (this.partitionsForm.get(partition.id).value){
        this.formElementPartitions.push(this.fb.control(partition))
      }
    }
    this.dialogRef.close();
  }

}
