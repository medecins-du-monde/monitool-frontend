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
  allPartitions: Partition[];
  private subscription: Subscription = new Subscription();
  partitionsForm: FormGroup;
  panelStates: Array<boolean> = [];

  get element(): FormElement{
    return this.data.value;
  }

  get allPanelsAreClosed(): boolean{
    for (const panel of this.panelStates){
      if (panel === true){
        return false;
      }
    }
    return true;
  }

  get formElementPartitions(): FormArray{
    return this.data.get('partitions') as FormArray;
  }
  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExistingPartitionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.createOptions();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  createOptions(): void {
    this.partitionsForm = new FormGroup({});

    this.allPartitions = [];
    this.panelStates = [];
    if (this.project){
      for (const form of this.project.forms){
        for (const element of form.elements){
          if (element.id !== this.element.id){
            for (const partition of element.partitions){
              if (this.allPartitions.length) {
                if (!this.allPartitions.some(el => el.name === partition.name)) {
                  this.allPartitions.push(partition);
                } else {
                  this.allPartitions.forEach(par => {
                    par.elements.forEach(val => {
                      if (!partition.elements.some(part => part.name !== val.name)) {
                        this.allPartitions.push(partition);
                      }
                    })
                  });
                }
              } else {
                this.allPartitions.push(partition);
              }
              this.panelStates.push(true);
              this.partitionsForm.addControl(partition.id, new FormControl(false));
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    const selectedPartitions = [];
    for (const partition of this.allPartitions){
      if (this.partitionsForm.get(partition.id).value){
        selectedPartitions.push(partition);
      }
    }
    this.dialogRef.close({selectedPartitions});
  }


  openPanel(i: number): void{
    this.panelStates[i] = true;
  }

  closePanel(i: number): void{
    this.panelStates[i] = false;
  }

  togglePanel(i: number): void{
    this.panelStates[i] = !this.panelStates[i];
  }

  minimizePanels(): void{
    for (let i = 0; i < this.panelStates.length; i += 1){
      this.panelStates[i] = false;
    }
  }

  maximizePanels(): void{
    for (let i = 0; i < this.panelStates.length; i += 1){
      this.panelStates[i] = true;
    }
  }

}
