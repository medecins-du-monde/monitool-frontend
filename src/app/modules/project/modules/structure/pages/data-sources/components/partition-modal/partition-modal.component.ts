import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartitionElement } from 'src/app/models/partition-element.model';
import { PartitionGroup } from 'src/app/models/partition-group.model';

@Component({
  selector: 'app-partition-modal',
  templateUrl: './partition-modal.component.html',
  styleUrls: ['./partition-modal.component.scss']
})
export class PartitionModalComponent implements OnInit {

  public aggregations = [
    {
      value: 'sum',
      display: 'Enum.Aggregation.sum'
    },
    {
      value: 'average',
      display: 'Enum.Aggregation.average'
    },
    {
      value: 'highest',
      display: 'Enum.Aggregation.highest'
    },
    {
      value: 'lowest',
      display: 'Enum.Aggregation.lowest'
    }
  ];

  elementsDisplayedColumns: string[] = ['position', 'name', 'delete'];

  get elements(): FormArray {
    return this.data.controls.elements as FormArray;
  }

  groupsDisplayedColumns: string[] = ['position', 'name', 'members', 'delete'];

  get groups(): FormArray {
    return this.data.controls.groups as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PartitionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) { }

  ngOnInit(): void {}

  onAddNewElement() {
    this.elements.push(this.newElement());
    console.log(this.elements.controls);
  }

  onRemoveElement(i: number) {
    this.elements.removeAt(i);
  }

  private newElement(): FormGroup {
    const element = new PartitionElement();
    return this.fb.group({
      id: [element.id],
      name: [element.name, Validators.required]
    });
  }

  onAddNewGroup() {
    this.groups.push(this.newGroup());
  }

  onRemoveGroup(i: number) {
    this.groups.removeAt(i);
  }

  private newGroup(): FormGroup {
    const group = new PartitionGroup();
    return this.fb.group({
      id: [group.id],
      name: [group.name, Validators.required],
      members: this.fb.array([])
    });
  }
}
