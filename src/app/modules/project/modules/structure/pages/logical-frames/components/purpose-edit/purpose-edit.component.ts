import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purpose-edit',
  templateUrl: './purpose-edit.component.html',
  styleUrls: ['./purpose-edit.component.scss']
})
export class PurposeEditComponent implements OnInit {

  @Input() purposeForm: FormGroup;

  get outputs(): FormArray {
    return this.purposeForm.controls.outputs as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onAddNewOutput() {
    this.outputs.push(this.newOutput());
  }

  onRemoveOutput(i: number) {
    this.outputs.removeAt(i);
  }

  private newOutput(): FormGroup {
    const output = new Output();
    return this.fb.group({
      assumptions: [output.assumtions, Validators.required],
      description: [output.description, Validators.required],
      activities: this.fb.array([])
    });
  }

}
