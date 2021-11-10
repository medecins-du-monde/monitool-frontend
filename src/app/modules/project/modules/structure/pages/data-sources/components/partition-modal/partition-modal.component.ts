import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';

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

  elementsDataSource = new BehaviorSubject<AbstractControl[]>([]);

  groupsDisplayedColumns: string[] = ['position', 'name', 'members', 'delete'];

  get groups(): FormArray {
    return this.data.controls.groups as FormArray;
  }

  groupsDataSource = new BehaviorSubject<AbstractControl[]>([]);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PartitionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) {
    this.elementsDataSource.next(this.elements.controls);
    this.groupsDataSource.next(this.groups.controls);
  }

  ngOnInit(): void {
    this.elements.push(this.newElement());
    this.elements.push(this.newElement());
  }

  onAddNewElement() {
    this.elements.push(this.newElement());
    this.elementsDataSource.next(this.elements.controls);
  }

  onRemoveElement(i: number) {
    this.elements.removeAt(i);
    this.elementsDataSource.next(this.elements.controls);
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
    this.groupsDataSource.next(this.groups.controls);
  }

  onRemoveGroup(i: number) {
    this.groups.removeAt(i);
    this.groupsDataSource.next(this.groups.controls);
  }

  private newGroup(): FormGroup {
    const group = new PartitionGroup();
    return this.fb.group({
      id: [group.id],
      name: [group.name, Validators.required],
      members: [[]]
    });
  }

  onSubmit() {
    this.dialogRef.close({ save: true, data: this.data });
  }

  onDelete() {
    this.dialogRef.close({ save: false, data: this.data });
  }
}
