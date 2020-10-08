import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-output-edit',
  templateUrl: './output-edit.component.html',
  styleUrls: ['./output-edit.component.scss']
})
export class OutputEditComponent implements OnInit {

  @Input() outputForm: FormGroup;

  get activities(): FormArray {
    return this.outputForm.controls.activities as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  onAddNewActivity() {
    this.activities.push(this.newActivity());
  }

  onRemoveActivity(i: number) {
    this.activities.removeAt(i);
  }

  private newActivity(): FormGroup {
    const activity = new Activity();
    return this.fb.group({
      description: [activity.description, Validators.required]
    });
  }
}
