import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { ExistingPartitionModalComponent } from '../existing-partition-modal/existing-partition-modal.component';
import { PartitionModalComponent } from '../partition-modal/partition-modal.component';


@Component({
  selector: 'app-form-element-edit',
  templateUrl: './form-element-edit.component.html',
  styleUrls: ['./form-element-edit.component.scss']
})
export class FormElementEditComponent implements OnInit {

  @Input() elementForm: UntypedFormGroup;
  @Input() dataSourceName = '';

  chosenStructure;

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

  receiveStructure(event) {
    this.chosenStructure = event;
  }

  get partitions(): UntypedFormArray {
    return this.elementForm.controls.partitions as UntypedFormArray;
  }

  constructor(
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.chosenStructure = this.elementForm.value.distribution;
  }

  onAddNewPartition() {
    const partition: UntypedFormGroup = this.newEmptyPartition();
    this.openDialog(partition);
  }

  onUseExistingPartition(){
    this.openExistingPartitionDialog();
  }

  onRemovePartition(i: number) {
    this.partitions.removeAt(i);
    this.elementForm.get('distribution').patchValue(0);
  }

  private newEmptyPartition(): UntypedFormGroup {
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

  openExistingPartitionDialog(){
    const dialogRef = this.dialog.open(ExistingPartitionModalComponent, { data: this.elementForm });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        for (const partition of res.selectedPartitions){
          this.partitions.push(this.newPartition(partition));
        }
      }
      this.changeDetector.markForCheck();
      dialogSubscription.unsubscribe();
    });
  }

  private newPartition(partition: Partition): UntypedFormGroup {
    const partitionForm = this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggregation],
      elements: this.fb.array(partition.elements.map(x => this.newPartitionElement(x))),
      useGroups: [partition.useGroups]
    });
    const elements = partitionForm.controls.elements as UntypedFormArray;
    partitionForm.addControl('groups', this.fb.array(
      partition.useGroups ? partition.groups.map(x => this.newPartitionGroup(x, elements)) : []));
    return partitionForm;
  }

  private newPartitionElement(partitionElement: PartitionElement): UntypedFormGroup {
    return this.fb.group({
      id: [partitionElement.id],
      name: [partitionElement.name, Validators.required]
    });
  }

  private newPartitionGroup(partitionGroup: PartitionGroup, elements: UntypedFormArray): UntypedFormGroup {
    return this.fb.group({
      id: [partitionGroup.id],
      name: [partitionGroup.name, Validators.required],
      members: [elements.value.filter(x => partitionGroup.members.map(m => m.id).includes(x.id))]
    });
  }



  openDialog(partition: UntypedFormGroup) {
    const dialogRef = this.dialog.open(PartitionModalComponent, { data: partition });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
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

      this.changeDetector.markForCheck();
      dialogSubscription.unsubscribe();
    });
  }

}
