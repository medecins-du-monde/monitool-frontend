import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form } from 'src/app/models/classes/form.model';

@Component({
  selector: 'app-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ['./data-source-selector.component.scss']
})
export class DataSourceSelectorComponent implements OnInit {

  public allOption: Form = new Form({id: 'all', name: 'All'})

  @Input() form: FormGroup;
  @Input() dataSources: Form[]

  constructor() { }


  // used to generate the list of chips
  get selectedDataSources(){
    // if the allOption is selected, we only return one chip
    if (this.form.get('dataSources').value.includes(this.allOption)){
      return [this.allOption]
    }
    else{
      return this.form.get('dataSources').value;
    }
  }

  checkIfAllOption(dataSource){
    return dataSource === this.allOption;
  }

  ngOnInit(): void {
    const currentForms = this.form.get('dataSources');
    console.log(currentForms.value)
    if (currentForms.value.length === this.dataSources.length){
      currentForms.setValue([...this.dataSources, this.allOption]);
    }
  }

  onDataSourceRemoved(dataSource){
    const currentForms = this.form.get('dataSources');
    // if we're removing the allOption we deselect everything
    if (dataSource === this.allOption){
      currentForms.setValue([]) ;
    }
    // if we're removing a normal option we only deselect that specific option
    else{
      currentForms.setValue(currentForms.value.filter(d => d.id !== dataSource.id));
    }
  }

  toggleAllSelection(): void{
    const currentForms = this.form.get('dataSources');
    // selecting the allOption we just add everything
    if (currentForms.value.includes(this.allOption)){
      currentForms.setValue([...this.dataSources, this.allOption]);
    }
    // removing the allOption we remove everything
    else{
      currentForms.setValue([]);
    }
  }
  
  toggleNormalOption(dataSourceClicked: Form){
    const currentForms = this.form.get('dataSources');

    // this means it is selecting a new option
    if (currentForms.value.includes(dataSourceClicked)){
      // if selecting this option make we have all dataSources selected we must add the 'allOption'
      if (currentForms.value.length === this.dataSources.length){
        currentForms.setValue([...this.dataSources, this.allOption])
      }
    }
    // this means we are deselecting an option
    else{
      // filter the allOption out of the form
      currentForms.setValue(currentForms.value.filter(d => d.id !== this.allOption.id));
    }
  }

}
