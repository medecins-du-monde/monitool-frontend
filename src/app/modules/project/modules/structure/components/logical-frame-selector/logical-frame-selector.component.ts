import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';

@Component({
  selector: 'app-logical-frame-selector',
  templateUrl: './logical-frame-selector.component.html',
  styleUrls: ['./logical-frame-selector.component.scss']
})
export class LogicalFrameSelectorComponent implements OnInit {

  public allOption: LogicalFrame = new LogicalFrame({id: 'all', name: 'All'});

  @Input() userForm: UntypedFormGroup;
  @Input() hint = 'Tooltip.UserEdition.LogicalFrames';
  @Input() logicalFrames: LogicalFrame[];

  // used to generate the list of chips
  get selectedLogicalFrames() {
    // if the allOption is selected, we only return one chip
    if (this.userForm.get('logicalFrames').value.includes(this.allOption)){
      return [this.allOption];
    }
    else{
      return this.userForm.get('logicalFrames').value;
    }
  }

  ngOnInit(): void {
    const currentLogicalFrames = this.userForm.get('logicalFrames');
    if (currentLogicalFrames.value.length === this.logicalFrames.length){
      currentLogicalFrames.setValue([...this.logicalFrames, this.allOption]);
    }
  }

  onLogicalFrameRemoved(logicalFrame): void{
    const currentLogicalFrames = this.userForm.get('logicalFrames');
    // if we're removing the allOption we deselect everything
    if (logicalFrame === this.allOption){
      currentLogicalFrames.setValue([]) ;
    }
    // if we're removing a normal option we only deselect that specific option
    else{
      currentLogicalFrames.setValue(currentLogicalFrames.value.filter(d => d.id !== logicalFrame.id));
    }
  }

  toggleAllSelection(): void{
    const currentLogicalFrames = this.userForm.get('logicalFrames');
    // selecting the allOption we just add everything
    if (currentLogicalFrames.value.includes(this.allOption)){
      currentLogicalFrames.setValue([...this.logicalFrames, this.allOption]);
    }
    // removing the allOption we remove everything
    else{
      currentLogicalFrames.setValue([]);
    }
  }

  toggleNormalOption(logicalFrameClicked: LogicalFrame): void{
    const currentLogicalFrames = this.userForm.get('logicalFrames');

    // this means it is selecting a new option
    if (currentLogicalFrames.value.includes(logicalFrameClicked)){
      // if selecting this option make we have all logicalFrames selected we must add the 'allOption'
      if (currentLogicalFrames.value.length === this.logicalFrames.length){
        currentLogicalFrames.setValue([...this.logicalFrames, this.allOption]);
      }
    }
    // this means we are deselecting an option
    else{
      // filter the allOption out of the form
      currentLogicalFrames.setValue(currentLogicalFrames.value.filter(d => d.id !== this.allOption.id));
    }
  }

  checkIfAllOption(logicalFrame): boolean{
    return logicalFrame === this.allOption;
  }

}
