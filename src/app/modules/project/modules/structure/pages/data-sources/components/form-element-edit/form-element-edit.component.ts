import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Partition } from 'src/app/models/partition.model';

@Component({
  selector: 'app-form-element-edit',
  templateUrl: './form-element-edit.component.html',
  styleUrls: ['./form-element-edit.component.scss']
})
export class FormElementEditComponent implements OnInit {

  @Input() elementForm: FormGroup;

  public aggregations = [
    {
      value: 'sum',
      display: 'Enum.Aggragation.sum'
    },
    {
      value: 'average',
      display: 'Enum.Aggragation.average'
    },
    {
      value: 'highest',
      display: 'Enum.Aggragation.highest'
    },
    {
      value: 'lowest',
      display: 'Enum.Aggragation.lowest'
    },
    {
      value: 'none',
      display: 'Enum.Aggragation.none'
    }
  ];

  get partitions(): FormArray {
    return this.elementForm.controls.partitions as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.elementForm);
  }

  onAddNewPartition() {
    this.partitions.push(this.newPartition());
  }

  onRemovePartition(i: number) {
    this.partitions.removeAt(i);
  }

  private newPartition(): FormGroup {
    const partition = new Partition();
    return this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggreagation],
      elements: this.fb.array([]),
      groups: this.fb.array([])
    });
  }

}
