import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';
import { DeleteModalComponent } from '../../../../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-partition-modal',
  templateUrl: './partition-modal.component.html',
  styleUrls: ['./partition-modal.component.scss']
})
export class PartitionModalComponent implements OnInit {

  private previousData: any;

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

  get elements(): UntypedFormArray {
    return this.data.controls.elements as UntypedFormArray;
  }

  elementsDataSource = new BehaviorSubject<AbstractControl[]>([]);

  groupsDisplayedColumns: string[] = ['position', 'name', 'members', 'delete'];

  get groups(): UntypedFormArray {
    return this.data.controls.groups as UntypedFormArray;
  }

  groupsDataSource = new BehaviorSubject<AbstractControl[]>([]);

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<PartitionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UntypedFormGroup,
    private dialog: MatDialog
  ) {
    this.elementsDataSource.next(this.elements.controls);
    this.groupsDataSource.next(this.groups.controls);
  }

  ngOnInit(): void {
    this.previousData = {...this.data.value};
    if (!this.elements.value.length) {
      this.elements.push(this.newElement());
      this.elements.push(this.newElement());
    }
  }

  onAddNewElement() {
    this.elements.push(this.newElement());
    this.elementsDataSource.next(this.elements.controls);
  }

  onRemoveElement(i: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent, { data: { type: 'element', item: this.elements.value[i].name} });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.delete) {
        this.elements.removeAt(i);
        this.elementsDataSource.next(this.elements.controls);
        dialogSubscription.unsubscribe();
      }
    });
  }

  private newElement(): UntypedFormGroup {
    const element = new PartitionElement();
    return this.fb.group({
      id: [element.id],
      name: [element.name, Validators.required]
    });
  }

  onMoveElement(event: any) {
    moveItemInArray(this.elements.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.elements.value, event.previousIndex, event.currentIndex);
    this.elementsDataSource.next(this.elements.controls);
    // const array = this.elementsDataSource.getValue();
    // moveItemInArray(array, event.previousIndex, event.currentIndex);
    // this.elementsDataSource.next(array);
  }

  onAddNewGroup() {
    this.groups.push(this.newGroup());
    this.groupsDataSource.next(this.groups.controls);
  }

  onRemoveGroup(i: number) {
    this.groups.removeAt(i);
    this.groupsDataSource.next(this.groups.controls);
  }

  private newGroup(): UntypedFormGroup {
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
    const dialogRef = this.dialog.open(DeleteModalComponent, { data: { type: 'disaggregation', item: this.data.value.name} });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.delete) {
        this.dialogRef.close({ save: false, data: this.data });
        dialogSubscription.unsubscribe();
      }
    });
  }

  memberDisplay( member1: any, member2: any): string {
    if (member1.id === member2.id) {
      return member1.name;
    } else {
      return '';
    }
  }

  onReset() {
    this.data.patchValue(this.previousData);
  }
}
