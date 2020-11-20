import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Partition } from 'src/app/models/partition.model';
import { PartitionModalComponent } from '../partition-modal/partition-modal.component';


@Component({
  selector: 'app-form-element-edit',
  templateUrl: './form-element-edit.component.html',
  styleUrls: ['./form-element-edit.component.scss']
})
export class FormElementEditComponent implements OnInit {

  @Input() elementForm: FormGroup;
  @Input() dataSourceName= "";

  floatLabelControl = new FormControl('structure1');
  
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
    },
    {
      value: 'none',
      display: 'Enum.Aggregation.none'
    }
  ];

  get partitions(): FormArray {
    return this.elementForm.controls.partitions as FormArray;
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {}

  onAddNewPartition() {
    const partition: FormGroup = this.newPartition();
    this.openDialog(partition);
  }

  onRemovePartition(i: number) {
    this.partitions.removeAt(i);
  }

  private newPartition(): FormGroup {
    const partition = new Partition();
    return this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggregation, Validators.required],
      elements: this.fb.array([]),
      useGroups: [partition.useGroups],
      groups: this.fb.array([])
    });
  }

  openDialog(partition: FormGroup) {
    const dialogRef = this.dialog.open(PartitionModalComponent, { data: partition });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const existingPartitions = this.partitions.value.map(x => x.id);
        const index = existingPartitions.indexOf(res.data.value.id);

        if (res.save) {
          index > -1 ? this.partitions.setControl(index, res.data) : this.partitions.push(res.data);
        } else {
          if ( index > -1 ) {
            this.onRemovePartition(index);
          }
        }
      }
    });
  }

}
